package com.hust.mycv.dto;

public class WorkDto {
	
	public String company;
	
	public String position;
	
	public String start;
	
	public String end;
	
	public String description;
	
	public WorkDto() {
		super();
	}

	public WorkDto(String company, String position, String start, String end, String description) {
		super();
		this.company = company;
		this.position = position;
		this.start = start;
		this.end = end;
		this.description = description;
	}

}
