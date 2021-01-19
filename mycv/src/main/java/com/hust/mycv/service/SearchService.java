package com.hust.mycv.service;

import java.util.List;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.SearchCvDto;
import com.hust.mycv.dto.SearchPaginationDto;

public interface SearchService {
	
	SearchPaginationDto filterCvs(List<CvDto> cvs, SearchCvDto dto);
	
	SearchPaginationDto searchCvs(List<CvDto> cvs, SearchCvDto dto);

}
