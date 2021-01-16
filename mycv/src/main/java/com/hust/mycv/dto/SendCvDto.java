package com.hust.mycv.dto;

public class SendCvDto {
	
	public String receiver;
	
	public Integer cvId;
	
	public String type;
	
	public SendCvDto() {
		super();
	}

	public SendCvDto(String receiver, Integer cvId, String type) {
		super();
		this.receiver = receiver;
		this.cvId = cvId;
		this.type = type;
	}

}
