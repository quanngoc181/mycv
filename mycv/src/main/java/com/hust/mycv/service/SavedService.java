package com.hust.mycv.service;

import java.util.List;

import com.hust.mycv.dto.SavedCvDto;
import com.hust.mycv.dto.SearchResultDto;

public interface SavedService {
	
	List<SearchResultDto> findByUsername(String username);
	
	SearchResultDto saveCv(String username, SavedCvDto dto);
	
	void deleteCv(String username, Integer id);

}
