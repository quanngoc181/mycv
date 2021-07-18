package com.hust.mycv.service;

import java.util.List;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.PublicCvDto;
import com.hust.mycv.dto.SendCvDto;

public interface CvService {
	
	List<CvDto> findByUsername(String username);
	
	List<CvDto> findAll();
	
	CvDto viewCv(String identifier);
	
	CvDto findById(Integer id);
	
	List<CvDto> findByIds(List<Integer> ids);
	
	void deleteById(Integer id);
	
	CvDto createCv(CvDto dto, String username);
	
	CvDto updateCv(CvDto dto, String username, Integer id);
	
	void publicCv(PublicCvDto dto);
	
	void addView(String identifier);
	
	void addDownload(String identifier);
	
	void sendCv(SendCvDto dto, String username);

}
