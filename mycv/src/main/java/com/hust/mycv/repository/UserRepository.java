package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.User;

public interface UserRepository extends JpaRepository<User, String> {

}
