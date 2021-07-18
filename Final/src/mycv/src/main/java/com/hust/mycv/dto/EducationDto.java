package com.hust.mycv.dto;

public class EducationDto {
	
	public String school;
	
	public String field;
	
	public String start;
	
	public String end;
	
	public String description;
	
	public EducationDto() {
		super();
	}

	public EducationDto(String school, String field, String start, String end, String description) {
		super();
		this.school = school;
		this.field = field;
		this.start = start;
		this.end = end;
		this.description = description;
	}

}
