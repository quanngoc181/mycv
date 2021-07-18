package com.hust.mycv.dto;

public class ReceiverInfoDto {

	public String username;
	
	public String fullName;
	
	public String avatar;
	
	public ReceiverInfoDto() {
		super();
	}

	public ReceiverInfoDto(String username, String fullName, String avatar) {
		super();
		this.username = username;
		this.fullName = fullName;
		this.avatar = avatar;
	}
	
}
