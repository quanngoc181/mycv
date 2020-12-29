package com.hust.mycv.dto;

public class ChangePasswordDto {
	
	public String oldpassword;

	public String newpassword;
	
	public ChangePasswordDto() {
		super();
	}

	public ChangePasswordDto(String oldpassword, String newpassword) {
		super();
		this.oldpassword = oldpassword;
		this.newpassword = newpassword;
	}

}
