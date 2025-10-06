package com.aginas.SERVER_WHAMP.controller;


import com.aginas.SERVER_WHAMP.models.DietPlan;
import com.aginas.SERVER_WHAMP.models.Forum;
import com.aginas.SERVER_WHAMP.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/api/")
public class MainController {

    @Autowired
    MainService service;



    @PostMapping("/forum")
    public ResponseEntity<Forum> forumContent(
            @RequestParam String emailId,
            @RequestParam String name,
            @RequestParam String address,
            @RequestParam Long phoneNo,
            @RequestParam String content
    ) {
        Forum forum = new Forum();
        forum.setEmailId(emailId);
        forum.setName(name);
        forum.setAddress(address);
        forum.setPhoneNo(phoneNo);
        forum.setContent(content);


        return service.addForum(forum);



    }

    @GetMapping("/plan")
    public List<DietPlan> getAllPlans() {
        return service.getAllPlans();
    }


    @PostMapping("/addPlan")
    public DietPlan createPlan(
            @RequestParam String title,
            @RequestParam String subTitle,
            @RequestParam String imageUrl) {

        DietPlan plans = new DietPlan();
        plans.setTitle(title);
        plans.setSubTitle(subTitle);
        plans.setImageUrl(imageUrl);


        return service.addPlan(plans);
    }


}
