package com.hust.mycv.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.School;
import com.hust.mycv.repository.SchoolRepository;
import com.hust.mycv.service.SchoolService;

@Service
public class SchoolServiceImpl implements SchoolService {
	
	@Autowired
	SchoolRepository schoolRepository;
	
	public void updateSchool(CvDto dto) {
		List<String> schools = dto.educations.stream().map(e -> e.school).collect(Collectors.toList());
		
		for (String school : schools) {
			if(school != null) {
				school = school.trim();
				
				School exist = schoolRepository.findByName(school);
				
				if (exist == null) {
					School newSchool = new School();
					newSchool.setName(school);
					schoolRepository.save(newSchool);
				}
			}
		}
	}

}
