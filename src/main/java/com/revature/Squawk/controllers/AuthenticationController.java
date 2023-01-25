package com.revature.Squawk.controllers;

import com.revature.Squawk.models.User;
import com.revature.Squawk.services.LogService;
import com.revature.Squawk.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.revature.Squawk.models.UserAuth;

import java.util.List;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {
    private UserService userService;
    private LogService logService;

    @Autowired
    public AuthenticationController(UserService userService, LogService logService) {
        this.logService = logService;
        this.userService = userService;
    }
    
    @PostMapping(value = "/login")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    
    public @ResponseBody User authenticateUser(@RequestBody UserAuth userAuth){
        User auth = userService.authenticateUser(userAuth);
        if(auth != null) {
            logService.logMsg(String.format("%s Successfuly signed in", auth.getUsername()), auth);
        }
        return auth;
    }


    @GetMapping(value = "/all")
    @ResponseStatus(value = HttpStatus.ACCEPTED)
    public @ResponseBody List<User> allUsers() {
        return userService.allUsers();
    }

}
