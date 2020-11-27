package com.hust.mycv.dto;

public class RegisterDTO {

	public String username;

	public String password;

	public String fullName;

	public String email;

	public RegisterDTO() {
		super();
	}

	public RegisterDTO(String username, String password, String fullName, String email) {
		super();
		this.username = username;
		this.password = password;
		this.fullName = fullName;
		this.email = email;
	}
}
