package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
	
	Company findByName(String name);

}
