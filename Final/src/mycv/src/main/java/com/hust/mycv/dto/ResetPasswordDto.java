package com.hust.mycv.dto;

public class ResetPasswordDto {

	public String newpassword;

	public String token;

	public ResetPasswordDto() {
		super();
	}

	public ResetPasswordDto(String newpassword, String token) {
		super();
		this.newpassword = newpassword;
		this.token = token;
	}

}
