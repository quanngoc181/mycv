package com.hust.mycv.dto;

public class ResetPasswordDTO {
	public String newpassword;
	
	public String token;
	
	public ResetPasswordDTO() {}

	public ResetPasswordDTO(String newpassword, String token) {
		super();
		this.newpassword = newpassword;
		this.token = token;
	}
}
