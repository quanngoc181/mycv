package com.hust.mycv.dto;

public class EmailTokenDto {
	
	public String email;
	
	public String token;
	
	public EmailTokenDto() {
		super();
	}

	public EmailTokenDto(String email, String token) {
		super();
		this.email = email;
		this.token = token;
	}

}
