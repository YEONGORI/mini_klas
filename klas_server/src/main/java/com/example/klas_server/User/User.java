package com.example.klas_server.User;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class User {
    @Id
    @Column(nullable = false, name = "userid")
    private Integer userId;

    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false, name = "usertype")
    private UserType userType;
//
//    public User(final String name, final Integer userId, final String password, final UserType userType) {
//        Assert.hasText(name, "이름은 필수입니다.");
//        Assert.notNull(userId, "id는 필수입니다.");
//        Assert.hasText(password, "비밀번호는 필수입니다.");
//        Assert.notNull(userType, "사용자 유형은 필수입니다.");
//
//        this.name = name;
//        this.userId = userId;
//        this.password = password;
//        this.userType = userType;
//    }
}
