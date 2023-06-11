package com.example.klas_server.User;

import com.example.klas_server.Exception.DuplicateUserException;
import com.example.klas_server.Exception.UserIdNotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private static String CLIENT_ID;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private static String CLIENT_SECRET;
    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private static String REDIRECT_URI;
    @Value("${spring.security.oauth2.client.provider.kakao.token-uri}")
    private static String TOKEN_URI;
    @Value("${spring.security.oauth2.client.provider.kakao.user-info-uri}")
    private static String USER_INFO_URI;

    public void SignUp(final SignUpUserRequest req) {
        try {
            userRepository.findByUserId(req.userId()).ifPresent(user -> {
                throw new DuplicateUserException("사용자 " + req.userId() + "이 이미 존재합니다.");
            });
            userRepository.save(User.builder()
                    .name(req.name())
                    .userId(req.userId())
                    .password(req.password())
                    .userType(req.userType())
                    .build());
        } catch (JpaSystemException e) {
            e.printStackTrace();
        }
    }

    public String SignIn(final SignInUserRequest req) {
        try {
            AtomicReference<String> tokenRef = new AtomicReference<>();
            userRepository.findByUserId(req.userId()).ifPresentOrElse(user -> tokenRef.set(getJwtToken(user.getUserId(), user.getUserType())), () -> {
                throw new UserIdNotFoundException("사용자 " + req.userId() + "가 존재하지 않습니다.");
            });
            return tokenRef.get();
        } catch (JpaSystemException e) {
            e.printStackTrace();
        }
        return null;
    }

    public void KakaoSignIn(final SignInKakaoRequest req, final HttpServletResponse res) {
        try {
            String accessToken = getAccessToken(req.code());
            String nickname = getKakaoUserInfo(accessToken);
            User user = kakaoSignUp(req.userId(), nickname);
            forceSignIn(user, res);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    private static String getJwtToken(Integer userId, UserType userType) {
        Claims claims = Jwts.claims();
        claims.put("userId", userId.toString());
        claims.put("userType", userType.toString());

        byte[] keyBytes = Decoders.BASE64.decode("base64EncodedSecretKeybase64EncodedSecretKeybase64EncodedSecretKeybase64EncodedSecretKey");
        Key key = Keys.hmacShaKeyFor(keyBytes);

        int expirationTime = 3600_000; // 만료시간 1 hour
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    private static String getAccessToken(final String code) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", CLIENT_ID);
        body.add("client_secret", CLIENT_SECRET);
        body.add("redirect_uri", REDIRECT_URI);
        body.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> res = rt.exchange(
                TOKEN_URI,
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        String responseBody = res.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        return jsonNode.get("access_token").asText();
    }

    private static String getKakaoUserInfo(final String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoUserInfoRequest = new HttpEntity<>(headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> res = rt.exchange(
                USER_INFO_URI,
                HttpMethod.POST,
                kakaoUserInfoRequest,
                String.class
        );

        String responseBody = res.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        return jsonNode.get("properties").get("nickname").asText();
    }

    private User kakaoSignUp(Integer userId, String nickname) {
        User user = userRepository.findByUserId(userId).orElse(null);

        if (user == null) {
            String password = UUID.randomUUID().toString();
            UserType userType = UserType.STUDENT;
            userRepository.save(User.builder()
                    .name(nickname)
                    .userId(userId)
                    .password(password)
                    .userType(userType)
                    .build());
        }
        return user;
    }

    private static void forceSignIn(User user, HttpServletResponse res) {
        AtomicReference<String> tokenRef = new AtomicReference<>();
        tokenRef.set(getJwtToken(user.getUserId(), UserType.STUDENT));
        res.addHeader("Authorization", "BEARER " + tokenRef.get());
    }
}
