package com.revature.Squawk.repositories;

import com.revature.Squawk.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT * FROM users u WHERE u.username = :username", nativeQuery = true)
    User authUser(
            @Param("username") String username
    );

    @Query(value = "select * from users;", nativeQuery = true)
    List<User> allUsers();

    // for password reset
    // TODO: probably don't need a list but only a User object
    @Query(value = "SELECT * FROM users WHERE username = :username AND email = :email", nativeQuery = true)
    User recoverUser(
            @Param("username") String username,
            @Param("email") String email
    );


    // update password
    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET password = :password WHERE user_id = :userId", nativeQuery = true)
    Integer passwordUpdate(
            @Param("password") String password,
            @Param("userId") Integer userId
    );


    public List<User> findByUsernameContainsIgnoreCase(String filter);
}
