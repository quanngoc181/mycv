package com.hust.mycv.dto;

import java.util.List;

public class BookDto {
	
	public String title;
	
	public String publisher;
	
	public String location;
	
	public List<String> authors;
	
	public Integer year;
	
	public BookDto() {
		super();
	}

	public BookDto(String title, String publisher, String location, List<String> authors, Integer year) {
		super();
		this.title = title;
		this.publisher = publisher;
		this.location = location;
		this.authors = authors;
		this.year = year;
	}

}
