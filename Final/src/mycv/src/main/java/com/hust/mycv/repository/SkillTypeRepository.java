package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.SkillType;

public interface SkillTypeRepository extends JpaRepository<SkillType, Integer> {
	
	SkillType findByName(String name);

}
