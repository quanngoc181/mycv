package com.hust.mycv.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.School;
import com.hust.mycv.repository.SchoolRepository;

@Service
public class SchoolService {
	
	@Autowired
	SchoolRepository schoolRepository;
	
	public SchoolService() {
		super();
	}
	
	public void updateSchool(Cv cv) {
		List<String> schools = cv.getEducations().stream().map(e -> e.getSchool()).collect(Collectors.toList());
		
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
