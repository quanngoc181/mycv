package com.hust.mycv.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.Company;
import com.hust.mycv.repository.CompanyRepository;
import com.hust.mycv.service.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {
	
	@Autowired
	CompanyRepository companyRepository;
	
	public CompanyServiceImpl() {
		super();
	}
	
	public void updateCompany(CvDto dto) {
		List<String> companies = dto.works.stream().map(e -> e.company).collect(Collectors.toList());
		
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
