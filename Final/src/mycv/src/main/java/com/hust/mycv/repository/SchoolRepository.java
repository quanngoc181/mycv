package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.School;

public interface SchoolRepository extends JpaRepository<School, Integer> {

	School findByName(String name);
	
}
