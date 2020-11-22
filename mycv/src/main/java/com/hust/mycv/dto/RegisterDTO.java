package com.hust.mycv.dto;

public class RegisterDTO {

	public String username;

	public String password;

	public String firstName;

	public String lastName;

	public String email;

	public RegisterDTO() {
		super();
	}

	public RegisterDTO(String username, String password, String firstName, String lastName, String email) {
		super();
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	}
}
