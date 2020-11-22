package com.hust.mycv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.dto.RegisterDTO;
import com.hust.mycv.entity.ApplicationUser;
import com.hust.mycv.entity.UserInfo;
import com.hust.mycv.repository.UserInfoRepository;
import com.hust.mycv.repository.UserRepository;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserInfoRepository userInfoRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@PostMapping("/user")
	public ApplicationUser register(@RequestBody RegisterDTO dto) {
		// kiểm tra tài khoản tồn tại
		ApplicationUser exist = userRepository.findByUsername(dto.username);
		if (exist != null)
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản này đã tồn tại");

		// lưu account
		ApplicationUser user = new ApplicationUser();
		user.setUsername(dto.username);
		user.setPassword(passwordEncoder.encode(dto.password));
		ApplicationUser res = userRepository.save(user);
		res.setPassword(null);

		UserInfo info = new UserInfo();
		info.setUsername(dto.username);
		info.setFirstName(dto.firstName);
		info.setLastName(dto.lastName);
		info.setEmail(dto.email);
		userInfoRepository.save(info);

		return res;
	}
}
