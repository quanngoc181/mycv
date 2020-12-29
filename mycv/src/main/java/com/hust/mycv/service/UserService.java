package com.hust.mycv.service;

import java.util.List;

import com.hust.mycv.dto.ChangePasswordDto;
import com.hust.mycv.dto.EmailTokenDto;
import com.hust.mycv.dto.RegisterDto;
import com.hust.mycv.dto.ResetPasswordDto;
import com.hust.mycv.dto.UserDto;

public interface UserService {

	public UserDto findByUsername(String username);

	public void confirmEmail(String cet);

	public EmailTokenDto register(RegisterDto dto);

	public void changePassword(String username, ChangePasswordDto dto);

	public List<EmailTokenDto> forgotPassword(String username);

	public void resetPassword(ResetPasswordDto dto);

	public void createInfo(RegisterDto dto);

	public List<String> findEmailByUsername(String username);

}
