package com.hust.mycv.dto;

public class SavedCvDto {
	
	public String username;
		
	public Integer cvId;
	
	public SavedCvDto() {
		super();
	}

	public SavedCvDto(String username, Integer cvId) {
		super();
		this.username = username;
		this.cvId = cvId;
	}

}
