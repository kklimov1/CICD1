package com.revature.Squawk.services;

import com.revature.Squawk.models.Log;
import com.revature.Squawk.models.User;
import com.revature.Squawk.repositories.LogRepository;
import com.revature.Squawk.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.text.SimpleDateFormat;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;

@Service
public class LogService {
    private LogRepository logRepository;
    private UserRepository userRepository;

    @Autowired
    public LogService(LogRepository logRepository, UserRepository userRepository) {
        this.logRepository = logRepository;
        this.userRepository = userRepository;
    }


    public void logMsg(String event, User user) {
        long nowTStamp = System.currentTimeMillis();
        Timestamp currentTime = new Timestamp(nowTStamp);
        Log log = new Log(currentTime, user, event);
        this.logRepository.save(log);
    }
}
