package com.revature.Squawk.models;

import java.sql.Timestamp;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.Objects;

@Entity(name = "logs")
public class Log {
    @Id
    @Column(name = "log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "date_time")
    private Timestamp dateTime;


    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference( value = "log_user")
    @JoinColumn(name =  "user_id")
    private User user;


    @Column(length = 1200)
    private String event;

    public Log () {}

    public Log(Timestamp dateTime, User user, String event) {
        this.dateTime = dateTime;
        this.user = user;
        this.event = event;
    }

    public Log(Integer id, Timestamp dateTime, User user, String event) {
        this.id = id;
        this.dateTime = dateTime;
        this.user = user;
        this.event = event;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getDateTime() {
        return dateTime;
    }

    public void setDateTime(Timestamp dateTime) {
        this.dateTime = dateTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Log log = (Log) o;
        return Objects.equals(id, log.id) && Objects.equals(dateTime, log.dateTime) && Objects.equals(user, log.user) && Objects.equals(event, log.event);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, dateTime, user, event);
    }

    @Override
    public String toString() {
        return "Log{" +
                "id=" + id +
                ", dateTime=" + dateTime +
                ", user=" + user +
                ", event='" + event + '\'' +
                '}';
    }
}
