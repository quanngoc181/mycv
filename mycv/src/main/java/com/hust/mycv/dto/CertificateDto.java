package com.hust.mycv.dto;

public class CertificateDto {

	public String name;

	public String organization;

	public String year;

	public CertificateDto() {
		super();
	}

	public CertificateDto(String name, String organization, String year) {
		super();
		this.name = name;
		this.organization = organization;
		this.year = year;
	}

}
