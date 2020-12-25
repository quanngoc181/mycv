package com.hust.mycv.dto;

public class SearchCvDTO {
	
	public String language;
	
	public String gender;
	
	public int[] age;
	
	public String marital;
	
	public String[] tag;
	
	public String[] address;
	
	public String[] school;
	
	public String[] field;
	
	public String[] company;
	
	public String[] position;
	
	public String[] skill;
	
	public String keyword;
	
	public SearchCvDTO() {
		super();
	}

	public SearchCvDTO(String language, String gender, int[] age, String marital, String[] tag, String[] address, String[] school, String[] field, String[] company, String[] position, String[] skill, String keyword) {
		super();
		this.language = language;
		this.gender = gender;
		this.age = age;
		this.marital = marital;
		this.tag = tag;
		this.address = address;
		this.school = school;
		this.field = field;
		this.company = company;
		this.position = position;
		this.skill = skill;
		this.keyword = keyword;
	}

}
