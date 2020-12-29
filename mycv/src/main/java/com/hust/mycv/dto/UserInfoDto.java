package com.hust.mycv.dto;

public class UserInfoDto {
	
	public InfoDto viInfo;
	
	public InfoDto enInfo;
	
	public UserInfoDto() {
		super();
	}

	public UserInfoDto(InfoDto viInfo, InfoDto enInfo) {
		super();
		this.viInfo = viInfo;
		this.enInfo = enInfo;
	}

}
