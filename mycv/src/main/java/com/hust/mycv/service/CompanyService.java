package com.hust.mycv.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.entity.Company;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.repository.CompanyRepository;

@Service
public class CompanyService {
	
	@Autowired
	CompanyRepository companyRepository;
	
	public CompanyService() {
		super();
	}
	
	public void updateCompany(Cv cv) {
		List<String> companies = cv.getWorks().stream().map(e -> e.getCompany()).collect(Collectors.toList());
		
		for (String company : companies) {
			if(company != null) {
				company = company.trim();
				
				Company exist = companyRepository.findByName(company);
				
				if (exist == null) {
					Company newCompany = new Company();
					newCompany.setName(company);
					companyRepository.save(newCompany);
				}
			}
		}
	}

}
