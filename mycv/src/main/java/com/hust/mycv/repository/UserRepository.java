package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.ApplicationUser;

public interface UserRepository extends JpaRepository<ApplicationUser, Integer> {
	ApplicationUser findByUsername(String username);
	
	ApplicationUser findByConfirmEmailToken(String confirmEmailToken);
}
