package com.hust.mycv.dto;

public class MembershipDto {
	
	public String role;
	
	public String organization;
	
	public String start;
	
	public String end;
	
	public MembershipDto() {
		super();
	}

	public MembershipDto(String role, String organization, String start, String end) {
		super();
		this.role = role;
		this.organization = organization;
		this.start = start;
		this.end = end;
	}

}
