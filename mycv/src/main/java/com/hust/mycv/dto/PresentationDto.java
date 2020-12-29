package com.hust.mycv.dto;

public class PresentationDto {
	
	public String title;
	
	public String conference;
	
	public String location;
	
	public Integer year;
	
	public PresentationDto() {
		super();
	}

	public PresentationDto(String title, String conference, String location, Integer year) {
		super();
		this.title = title;
		this.conference = conference;
		this.location = location;
		this.year = year;
	}

}
