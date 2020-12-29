package com.hust.mycv.service;

public interface EmailService {

	void sendEnableAccountEmail(String to, String token);
	
	void sendResetPasswordEmail(String to, String token);
	
}
