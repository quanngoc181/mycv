package com.hust.mycv.dto;

import java.util.List;

public class SearchPaginationDto {
	public int page;
	
	public int total;
	
	public List<SearchResultDto> result;
	
	public SearchPaginationDto() {
		super();
	}

	public SearchPaginationDto(int page, int total, List<SearchResultDto> result) {
		super();
		this.page = page;
		this.total = total;
		this.result = result;
	}
}
