package com.hust.mycv.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.SkillType;
import com.hust.mycv.repository.SkillTypeRepository;
import com.hust.mycv.service.SkillTypeService;

@Service
public class SkillTypeServiceImpl implements SkillTypeService {
	
	@Autowired
	SkillTypeRepository skillTypeRepository;
	
	public SkillTypeServiceImpl() {
		super();
	}
	
	public void updateSkill(CvDto dto) {
		List<String> skills = dto.skills.stream().map(e -> e.name).collect(Collectors.toList());
		
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
