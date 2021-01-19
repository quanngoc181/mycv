package com.hust.mycv.dto;

public class SearchCvDto {
	
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
	
	public int page;
	
	public SearchCvDto() {
		super();
	}

	public SearchCvDto(String language, String gender, int[] age, String marital, String[] tag, String[] address, String[] school, String[] field, String[] company, String[] position, String[] skill, String keyword, int page) {
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
		this.page = page;
	}

}
