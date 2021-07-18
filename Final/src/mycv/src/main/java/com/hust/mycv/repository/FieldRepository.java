package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.Field;

public interface FieldRepository extends JpaRepository<Field, Integer> {

	Field findByName(String name);
	
}
