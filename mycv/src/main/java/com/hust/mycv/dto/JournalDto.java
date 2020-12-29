package com.hust.mycv.dto;

import java.util.List;

public class JournalDto {
	
	public String title;
	
	public String name;
	
	public List<String> authors;
	
	public Integer year;
	
	public Integer volume;
	
	public Integer issue;
	
	public Integer start;
	
	public Integer end;
	
	public JournalDto() {
		super();
	}

	public JournalDto(String title, String name, List<String> authors, Integer year, Integer volume, Integer issue, Integer start, Integer end) {
		super();
		this.title = title;
		this.name = name;
		this.authors = authors;
		this.year = year;
		this.volume = volume;
		this.issue = issue;
		this.start = start;
		this.end = end;
	}

}
