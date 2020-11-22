package com.hust.mycv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.entity.UserInfo;
import com.hust.mycv.repository.UserInfoRepository;
import com.hust.mycv.utility.StringUtility;

@RestController
public class UserInfoController {
	
	@Autowired
	UserInfoRepository userInfoRepository;
	
	@GetMapping("/user-info")
	public UserInfo getInfo(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.findByUsername(username);
		return info;
	}

}
