package com.hust.mycv.dto;

public class ProjectDto {
	
	public String company;
	
	public String name;
	
	public String start;
	
	public String end;
	
	public String description;
	
	public ProjectDto() {
		super();
	}

	public ProjectDto(String company, String name, String start, String end, String description) {
		super();
		this.company = company;
		this.name = name;
		this.start = start;
		this.end = end;
		this.description = description;
	}

}
