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
    public ResponseEntity<Void> SignInUser(@RequestBody final User req) {
        try {
            System.out.println(req.getUserId()+ "+" + req.getPassword());
            //String token = userService.SignIn(req);
            HttpHeaders headers = new HttpHeaders();
            //headers.set("Authorization", "Bearer " + token);
            return ResponseEntity.status(HttpStatus.ACCEPTED).headers(headers).build();
        } catch (UserIdNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (JpaSystemException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping(value = "/kakao")
    public ResponseEntity<Void> SignInKakao(@RequestBody final SignInKakaoRequest req, @RequestBody HttpServletResponse res) {
        userService.KakaoSignIn(req, res);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
//        try {
//            userService.KakaoSignIn(req, res);
//            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
//        } catch (JsonProcessingException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
    }

    @PostMapping("/me")
    public ResponseEntity<Integer> CheckSession(@RequestBody final User usersession){


        int sessionid = usersession.getUserId();
        try {
            int checked = userService.checkId(sessionid);
            if (checked == 0)
                return new ResponseEntity<>(0, HttpStatus.OK);
            else if(checked ==1)
                return new ResponseEntity<>(1, HttpStatus.OK);
            else
                return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
        }catch(Exception e){
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
