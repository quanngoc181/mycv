package com.hust.mycv.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	@Autowired
	public JavaMailSender emailSender;

	public EmailService() {}

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
}
