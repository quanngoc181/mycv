package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.AppUser;

public interface UserRepository extends JpaRepository<AppUser, Integer> {

	AppUser findByUsername(String username);

	AppUser findByConfirmEmailToken(String confirmEmailToken);

	AppUser findByResetPasswordToken(String resetPasswordToken);

}
