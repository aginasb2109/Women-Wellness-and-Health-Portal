package com.aginas.SERVER_WHAMP.controller;

import com.aginas.SERVER_WHAMP.models.PeriodTracker;
import com.aginas.SERVER_WHAMP.models.User;
import com.aginas.SERVER_WHAMP.repository.PeriodTrackerdb;
import com.aginas.SERVER_WHAMP.repository.Userrepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/period")
@CrossOrigin(origins = "*")
public class PeriodTrackerController {

    @Autowired
    private PeriodTrackerdb periodRepo;

    @Autowired
    private Userrepository userRepo;

    @PostMapping("/add/{userId}")
    public PeriodTracker addPeriod(@PathVariable Long userId, @RequestBody PeriodTracker period) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        period.setUser(user);
        return periodRepo.save(period);
    }

    @GetMapping("/user/{userId}")
    public List<PeriodTracker> getUserPeriods(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return periodRepo.findByUser(user);
    }
}
