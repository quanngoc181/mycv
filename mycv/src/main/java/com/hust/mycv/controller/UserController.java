package com.hust.mycv.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.dto.ChangePasswordDTO;
import com.hust.mycv.dto.RegisterDTO;
import com.hust.mycv.dto.ResetPasswordDTO;
import com.hust.mycv.entity.ApplicationUser;
import com.hust.mycv.entity.UserInfo;
import com.hust.mycv.repository.UserInfoRepository;
import com.hust.mycv.repository.UserRepository;
import com.hust.mycv.service.EmailService;
import com.hust.mycv.utility.StringUtility;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserInfoRepository userInfoRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	EmailService emailService;

	@GetMapping("/user")
	public ApplicationUser register(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());
		ApplicationUser user = userRepository.findByUsername(username);
		user.setPassword(null);
		return user;
	}

	@GetMapping("/confirm-email/{cet}")
	public void register(@PathVariable String cet) {
		ApplicationUser user = userRepository.findByConfirmEmailToken(cet);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

		user.setEnabled(true);

		userRepository.save(user);
	}

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
		user.setRole(dto.role);

		String confirmEmailToken = UUID.randomUUID().toString();
		user.setConfirmEmailToken(confirmEmailToken);

		ApplicationUser res = userRepository.save(user);
		res.setPassword(null);

		UserInfo info1 = new UserInfo();
		info1.setUsername(dto.username);
		info1.setFullName(dto.fullName);
		info1.setEmail(dto.email);
		info1.setLanguage("vi");
		userInfoRepository.save(info1);

		UserInfo info2 = new UserInfo();
		info2.setUsername(dto.username);
		info2.setFullName(dto.fullName);
		info2.setEmail(dto.email);
		info2.setLanguage("en");
		userInfoRepository.save(info2);

		emailService.sendEnableAccountEmail(dto.email, confirmEmailToken);

		return res;
	}

	@PutMapping("user/password")
	public void changePassword(Authentication auth, @RequestBody ChangePasswordDTO dto) {
		String username = StringUtility.getUserName(auth.getName());
		ApplicationUser user = userRepository.findByUsername(username);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

		if (!passwordEncoder.matches(dto.oldpassword, user.getPassword()))
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu cũ không chính xác");

		user.setPassword(passwordEncoder.encode(dto.newpassword));

		userRepository.save(user);
	}
	
	@PostMapping("/forgot-password")
	public void forgotPassword(@RequestParam String username) {
		String token = UUID.randomUUID().toString();
		ApplicationUser user = userRepository.findByUsername(username);
		List<UserInfo> infos = userInfoRepository.findByUsername(username);
		
		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");
		
		user.setResetPasswordToken(token);
		userRepository.save(user);
		
		emailService.sendResetPasswordEmail(infos.get(0).getEmail(), token);
	}
	
	@PostMapping("/reset-password")
	public void resetPassword(@RequestBody ResetPasswordDTO dto) {
		ApplicationUser user = userRepository.findByResetPasswordToken(dto.token);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

		user.setPassword(passwordEncoder.encode(dto.newpassword));

		userRepository.save(user);
	}
}
