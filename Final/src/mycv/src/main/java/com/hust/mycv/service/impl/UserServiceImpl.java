package com.hust.mycv.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.dto.ChangePasswordDto;
import com.hust.mycv.dto.EmailTokenDto;
import com.hust.mycv.dto.RegisterDto;
import com.hust.mycv.dto.ResetPasswordDto;
import com.hust.mycv.dto.UserDto;
import com.hust.mycv.entity.AppUser;
import com.hust.mycv.entity.Info;
import com.hust.mycv.repository.InfoRepository;
import com.hust.mycv.repository.UserRepository;
import com.hust.mycv.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	InfoRepository infoRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public UserDto findByUsername(String username) {

		AppUser user = userRepository.findByUsername(username);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");
		
		UserDto dto = new UserDto();
		
		dto.username = user.getUsername();
		dto.role = user.getRole();
		
		return dto;

	}

	@Override
	public void confirmEmail(String cet) {

		AppUser user = userRepository.findByConfirmEmailToken(cet);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

		user.setEnabled(true);

		userRepository.save(user);

	}

	@Override
	public EmailTokenDto register(RegisterDto dto) {

		AppUser exist = userRepository.findByUsername(dto.username);

		if (exist != null)
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tài khoản này đã tồn tại");

		AppUser user = new AppUser();
		user.setUsername(dto.username);
		user.setPassword(passwordEncoder.encode(dto.password));
		user.setRole(dto.role);
		user.setConfirmEmailToken(UUID.randomUUID().toString());

		AppUser ret = userRepository.save(user);

		this.createInfo(dto);

		return new EmailTokenDto(dto.email, ret.getConfirmEmailToken());

	}

	@Override
	public void changePassword(String username, ChangePasswordDto dto) {

		AppUser user = userRepository.findByUsername(username);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

		if (!passwordEncoder.matches(dto.oldpassword, user.getPassword()))
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Mật khẩu cũ không chính xác");

		user.setPassword(passwordEncoder.encode(dto.newpassword));

		userRepository.save(user);

	}

	@Override
	public List<EmailTokenDto> forgotPassword(String username) {

		AppUser user = userRepository.findByUsername(username);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

		user.setResetPasswordToken(UUID.randomUUID().toString());

		AppUser ret = userRepository.save(user);

		List<String> emails = this.findEmailByUsername(username);

		List<EmailTokenDto> dtos = new ArrayList<>();

		for (String email : emails) {
			dtos.add(new EmailTokenDto(email, ret.getResetPasswordToken()));
		}

		return dtos;

	}

	@Override
	public void resetPassword(ResetPasswordDto dto) {

		AppUser user = userRepository.findByResetPasswordToken(dto.token);

		if (user == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

		user.setPassword(passwordEncoder.encode(dto.newpassword));

		userRepository.save(user);

	}

	public void createInfo(RegisterDto dto) {

		Info info1 = new Info();

		info1.setUsername(dto.username);
		info1.setFullName(dto.fullName);
		info1.setEmail(dto.email);
		info1.setLanguage("vi");

		infoRepository.save(info1);

		Info info2 = new Info();

		info2.setUsername(dto.username);
		info2.setFullName(dto.fullName);
		info2.setEmail(dto.email);
		info2.setLanguage("en");

		infoRepository.save(info2);

	}

	public List<String> findEmailByUsername(String username) {

		List<Info> infos = infoRepository.findByUsername(username);

		List<String> emails = new ArrayList<>();

		for (Info info : infos) {
			String email = info.getEmail();
			if (email != null && !emails.contains(email)) {
				emails.add(email);
			}
		}

		if (emails.size() == 0)
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Tài khoản này không có email");

		return emails;

	}

}
