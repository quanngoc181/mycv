package com.hust.mycv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.entity.ApplicationUser;
import com.hust.mycv.repository.UserRepository;
import com.hust.mycv.utility.StringUtility;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@GetMapping("/user")
	public ApplicationUser getInfo(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());
		ApplicationUser user = userRepository.findByUsername(username);
		if (user != null)
			user.setPassword(null);
		return user;
	}

	@PostMapping("/user")
	public ApplicationUser register(@RequestBody ApplicationUser user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		ApplicationUser res = userRepository.save(user);
		res.setPassword(null);
		return res;
	}
}
