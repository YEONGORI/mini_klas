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
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

import static com.example.klas_server.User.UserType.PROFESSOR;
import static com.example.klas_server.User.UserType.STUDENT;

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

    public String SignIn(final User req) {
        try {
            AtomicReference<String> tokenRef = new AtomicReference<>();
            userRepository.findByUserId(req.getUserId()).ifPresentOrElse(user -> tokenRef.set(getJwtToken(user.getUserId(), user.getUserType())), () -> {
                throw new UserIdNotFoundException("사용자 " + req.getUserId() + "가 존재하지 않습니다.");
            });
            return tokenRef.get();
        } catch (JpaSystemException e) {
            e.printStackTrace();
        }
        return null;
    }

    public User findUserName(final Integer userId) {
        return userRepository.findByUserId(userId).get();
    }

    public String KakaoSignIn(final SignInKakaoRequest req) {
        try {
            String accessToken = getAccessToken(req.code());
            String nickname = getKakaoUserInfo(accessToken);
            User user = kakaoSignUp(req.userId(), nickname);
            return forceSignIn(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "";
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
        body.add("client_id", "2ab2ae3d4a5108ea9081265e2802998b");
        body.add("client_secret", "2klBe3aBkpCMh07z2mRtdVpok13GHdEd");
        body.add("redirect_uri", "http://localhost:3000/users/callback");
        body.add("code", code);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();

        ResponseEntity<String> res = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
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
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.GET,
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

    private static String forceSignIn(User user) {
        AtomicReference<String> tokenRef = new AtomicReference<>();
        tokenRef.set(getJwtToken(user.getUserId(), UserType.STUDENT));
        return tokenRef.get();
    }
    public int checkId(final int userid){
        AtomicInteger check = new AtomicInteger();
        userRepository.findByUserId(userid).ifPresentOrElse(
                user -> {
            if(user.getUserType()==STUDENT) check.set(0);
            else if(user.getUserType()==PROFESSOR) check.set(1);
            },
                ()->{check.set(2);
        });

        return check.get();
    }
}
