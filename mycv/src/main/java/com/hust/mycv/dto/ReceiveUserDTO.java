package com.hust.mycv.dto;

public class ReceiveUserDTO {

	public String username;
	
	public String fullName;
	
	public String avatar;
	
	public ReceiveUserDTO() {
		super();
	}

	public ReceiveUserDTO(String username, String fullName, String avatar) {
		super();
		this.username = username;
		this.fullName = fullName;
		this.avatar = avatar;
	}
	
}
