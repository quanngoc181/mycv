package com.hust.mycv.dto;

public class SearchResultDto {
	
	public Integer cvId;
	
	public String cvName;
	
	public String template;
	
	public String language;
	
	public String fullName;
	
	public String gender;
	
	public String dob;
	
	public String address;
	
	public String phone;
	
	public String identifier;
	
	public SearchResultDto() {
		super();
	}

	public SearchResultDto(Integer cvId, String cvName, String template, String language, String fullName, String gender, String dob, String address, String phone, String identifier) {
		super();
		this.cvId = cvId;
		this.cvName = cvName;
		this.template = template;
		this.language = language;
		this.fullName = fullName;
		this.gender = gender;
		this.dob = dob;
		this.address = address;
		this.phone = phone;
		this.identifier = identifier;
	}

}
