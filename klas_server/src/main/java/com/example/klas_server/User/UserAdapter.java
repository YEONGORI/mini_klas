package com.example.klas_server.User;

import org.springframework.stereotype.Component;

import static com.example.klas_server.User.UserType.PROFESSOR;
import static com.example.klas_server.User.UserType.STUDENT;

@Component
class UserAdapter implements UserPort {
    private final UserRepository userRepository;

    UserAdapter(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void save(final User user) {
        userRepository.save(user);
    }

    public int checkId(final int userid){
        User check = userRepository.findById(userid);
        System.out.println(check);
        System.out.println("hihihihihihih");
        if(check!=null && check.getUserType()==STUDENT)
            return 0;
        else if(check!=null && check.getUserType()==PROFESSOR)
            return 1;
        return 2;
    }

}
