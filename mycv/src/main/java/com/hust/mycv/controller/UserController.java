package com.hust.mycv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.entity.User;
import com.hust.mycv.repository.UserRepository;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
public class UserController {
	@Autowired
	UserRepository userRepository;

	@PostMapping("/user")
	public User register(@RequestBody User user) {
		User res = userRepository.save(user);
		res.setPassword(null);
		return res;
	}
}
