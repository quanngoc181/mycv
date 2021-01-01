package com.hust.mycv.service;

import java.util.List;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.SearchCvDto;
import com.hust.mycv.dto.SearchResultDto;

public interface SearchService {
	
	List<SearchResultDto> searchByFilter(List<CvDto> cvs, SearchCvDto dto);
	
	List<SearchResultDto> searchByKeyword(List<CvDto> cvs, SearchCvDto dto);

}
