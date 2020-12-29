package com.hust.mycv.dto;

public class AwardDto {
	
	public String name;
	
	public String organization;
	
	public String year;
	
	public AwardDto() {
		super();
	}

	public AwardDto(String name, String organization, String year) {
		super();
		this.name = name;
		this.organization = organization;
		this.year = year;
	}

}
