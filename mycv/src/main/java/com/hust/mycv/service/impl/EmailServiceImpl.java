package com.hust.mycv.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.hust.mycv.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {
	
	@Autowired
	public JavaMailSender emailSender;

	public void sendEnableAccountEmail(String to, String token) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("MYCV - Xác nhận email");
		String content = "Chào bạn,\r\n" +
						 "Vui lòng truy cập đường link bên dưới để xác nhận email:\r\n" + 
				 		 "http://localhost:3000/confirm-email/" + token;
		message.setText(content);
		emailSender.send(message);
	}
	
	public void sendResetPasswordEmail(String to, String token) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("MYCV - Lấy lại mật khẩu");
		String content = "Chào bạn,\r\n" +
						 "Vui lòng truy cập đường link bên dưới để lấy lại mật khẩu:\r\n" + 
				 		 "http://localhost:3000/reset-password/" + token;
		message.setText(content);
		emailSender.send(message);
	}
	
}
