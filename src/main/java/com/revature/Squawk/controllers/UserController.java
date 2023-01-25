package com.revature.Squawk.controllers;

import com.revature.Squawk.models.User;
import com.revature.Squawk.services.LogService;
import com.revature.Squawk.services.UserService;
import jdk.jfr.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/users")
public class UserController {
    private UserService userService;
    private LogService logService;
    @Autowired
    public UserController(UserService userService, LogService logService) {
        this.logService = logService;
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public @ResponseBody User createUser(@RequestBody User user){
        User newUser = userService.createUser(user);
        this.logService.logMsg(String.format("Created a new user %s", newUser.getUsername()), newUser);
        return newUser;
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody User getUser(@RequestParam Integer userId){
        return userService.getUser(userId);
    }

    @GetMapping(value = "/search")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody List<User> searchUsers(@RequestParam String filter){
        return userService.searchUsers(filter);
    }

    @PutMapping(value="/update")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody User updateUser(@RequestBody User user){
        User userUpd = userService.updateUser(user);
        logService.logMsg(String.format("Updated user %s", userUpd.getUsername()), userUpd);
        return userUpd;
    }

    @DeleteMapping
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public void deleteUser(@RequestBody User user){
        //May make an empty row if deleting
        logService.logMsg(String.format("Deleted user if exists: %s", user.getUsername()), user);
        userService.deleteUser(user);
    }

    // password reset functionality first request will be to get the user to recover and return the user id and
    // security question
    @GetMapping(value = "/recover")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody User recoverUser(@RequestParam String username, @RequestParam String email) {
        // return User object with security question, omit the answer and do that in another step
        // TODO: another request that should take the security answer and a new password
        // TODO: on the front end redirect back to login
        // TODO: if this is still a fully populated user object I could sanitize it before sending it back
        return userService.getSecurityQuestion(username, email);
    }

    @PostMapping(value = "/recover")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody boolean updatePassword(@RequestBody User user) {
        // return User object with security question, omit the answer and do that in another step
        // TODO: another request that should take the security answer and a new password
        // TODO: on the front end redirect back to login
        // password should already be encrypted at this point mirroring the registration component
        boolean test = userService.resetPassword(user.getUserId(), user.getSecurityAnswer(), user.getPassword());
        return test;
    }
}
