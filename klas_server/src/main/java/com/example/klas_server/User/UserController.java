package com.example.klas_server.User;

import com.example.klas_server.Exception.DuplicateUserException;
import com.example.klas_server.Exception.UserIdNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.orm.jpa.JpaSystemException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin
class UserController {
    private final UserService userService;

    @GetMapping
    @Transactional
    public ResponseEntity<Void> SignUpUser(@RequestBody final SignUpUserRequest req) {
        try {
            userService.SignUp(req);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (DuplicateUserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping
    public ResponseEntity<Integer> SignInUser(@RequestBody final User req) {
        try {
            System.out.println(req.getUserId()+ "+" + req.getPassword());
            String token = userService.SignIn(req);
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + token);


            int checked = userService.checkId(req.getUserId());
            System.out.println(checked);
            if (checked == 0)
                return ResponseEntity.status(HttpStatus.ACCEPTED).headers(headers).body(0);

            else if(checked ==1)
                return ResponseEntity.status(HttpStatus.ACCEPTED).headers(headers).body(1);
            else
                return ResponseEntity.status(HttpStatus.ACCEPTED).headers(headers).body(2);
        } catch (UserIdNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (JpaSystemException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/kakao")
    public ResponseEntity<Void> SignInKakao(@RequestBody final SignInKakaoRequest req) {
        String token = userService.KakaoSignIn(req);
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        return ResponseEntity.status(HttpStatus.ACCEPTED).headers(headers).build();
    }

    @GetMapping(value = "/name")
    public ResponseEntity<String> findUserName(@RequestBody final Map<String, Integer> req) {
        String name = userService.findUserNmae(req.get("userId"));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(name);
    }

    @PostMapping("/me")
    public ResponseEntity<Integer> CheckSession(@RequestBody final User usersession){

        int sessionid = usersession.getUserId();
        System.out.println("hihi");
        try {
            int checked = userService.checkId(sessionid);
            if (checked == 0)
                return ResponseEntity.ok(0);
            else if(checked ==1)
                return ResponseEntity.ok(1);
            else
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
