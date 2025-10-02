package com.aginas.SERVER_WHAMP.repository;

import com.aginas.SERVER_WHAMP.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Userrepository  extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);

}
