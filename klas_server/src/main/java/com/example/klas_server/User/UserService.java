package com.example.klas_server.User;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
class UserService {
    private final UserPort userPort;
    UserService(final UserPort userPort) {
        this.userPort = userPort;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<Void> SignUpUser(@RequestBody final SignUpUserRequest req) {
        final User user = new User(req.name(), req.userId(), req.password(), req.userType());
        userPort.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
