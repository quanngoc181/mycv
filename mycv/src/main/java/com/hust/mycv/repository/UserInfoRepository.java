package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
	UserInfo findByUsername(String username);
}
