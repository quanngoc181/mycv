package com.hust.mycv.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.SkillType;
import com.hust.mycv.repository.SkillTypeRepository;

@Service
public class SkillTypeService {
	
	@Autowired
	SkillTypeRepository skillTypeRepository;
	
	public SkillTypeService() {
		super();
	}
	
	public void updateSkill(Cv cv) {
		List<String> skills = cv.getSkills().stream().map(e -> e.getName()).collect(Collectors.toList());
		
		for (String skill : skills) {
			if(skill != null) {
				skill = skill.trim();
				
				SkillType exist = skillTypeRepository.findByName(skill);
				
				if (exist == null) {
					SkillType newSkill = new SkillType();
					newSkill.setName(skill);
					skillTypeRepository.save(newSkill);
				}
			}
		}
	}

}
