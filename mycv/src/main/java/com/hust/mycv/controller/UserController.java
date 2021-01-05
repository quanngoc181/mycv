package com.hust.mycv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.dto.ChangePasswordDto;
import com.hust.mycv.dto.EmailTokenDto;
import com.hust.mycv.dto.RegisterDto;
import com.hust.mycv.dto.ResetPasswordDto;
import com.hust.mycv.dto.UserDto;
import com.hust.mycv.service.EmailService;
import com.hust.mycv.service.UserService;
import com.hust.mycv.utility.StringUtility;

@RestController
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	EmailService emailService;

	@GetMapping("/users/current")
	public UserDto getUser(Authentication auth) {

		String username = StringUtility.getUserName(auth.getName());

		UserDto dto = userService.findByUsername(username);

		return dto;

	}

	@PostMapping("/users")
	public void register(@RequestBody RegisterDto dto) {

		EmailTokenDto user = userService.register(dto);

		emailService.sendEnableAccountEmail(user.email, user.token);

	}

	@PostMapping("/users/confirm-email")
	public void confirmEmail(@RequestParam String cet) {

		userService.confirmEmail(cet);

	}

	@PostMapping("/users/change-password")
	public void changePassword(Authentication auth, @RequestBody ChangePasswordDto dto) {

		String username = StringUtility.getUserName(auth.getName());

		userService.changePassword(username, dto);

	}

	@PostMapping("/users/forgot-password")
	public void forgotPassword(@RequestParam String username) {

		List<EmailTokenDto> dtos = userService.forgotPassword(username);

		for (EmailTokenDto dto : dtos) {
			emailService.sendResetPasswordEmail(dto.email, dto.token);
		}

	}

	@PostMapping("/users/reset-password")
	public void resetPassword(@RequestBody ResetPasswordDto dto) {

		userService.resetPassword(dto);

	}

}
