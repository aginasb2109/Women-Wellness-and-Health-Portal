package com.aginas.SERVER_WHAMP.service;


import com.aginas.SERVER_WHAMP.models.DietPlan;
import com.aginas.SERVER_WHAMP.models.Forum;
import com.aginas.SERVER_WHAMP.repository.DietPlanRepository;
import com.aginas.SERVER_WHAMP.repository.ForumDb;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MainService {

    @Autowired
    ForumDb db;

    @Autowired
    DietPlanRepository repo;


    public ResponseEntity<Forum> addForum(Forum forum) {

        Forum savedForum = db.save(forum);

        return ResponseEntity.ok(savedForum);

    }

    public List<DietPlan> getAllPlans() {
        return repo.findAll();
    }

    public DietPlan addPlan(DietPlan plans) {
        return repo.save(plans);
    }
}
