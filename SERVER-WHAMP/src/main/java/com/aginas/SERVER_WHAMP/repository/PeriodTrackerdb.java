package com.aginas.SERVER_WHAMP.repository;

import com.aginas.SERVER_WHAMP.models.PeriodTracker;
import com.aginas.SERVER_WHAMP.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PeriodTrackerdb extends JpaRepository<PeriodTracker,Long> {

    List<PeriodTracker> findByUser(User user);
}
