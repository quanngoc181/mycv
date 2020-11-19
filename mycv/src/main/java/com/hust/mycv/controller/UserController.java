package com.hust.mycv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.entity.ApplicationUser;
import com.hust.mycv.repository.UserRepository;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@GetMapping("/user")
	public ApplicationUser getInfo(@RequestParam String username) {
		ApplicationUser user = userRepository.findByUsername(username);
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
