package com.hust.mycv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.entity.ApplicationUser;
import com.hust.mycv.repository.UserRepository;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/user")
	public ApplicationUser register(@RequestBody ApplicationUser user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		ApplicationUser res = userRepository.save(user);
		res.setPassword(null);
		return res;
	}
}
