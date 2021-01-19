package com.hust.mycv.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.SearchCvDto;
import com.hust.mycv.dto.SearchPaginationDto;
import com.hust.mycv.dto.SearchResultDto;
import com.hust.mycv.service.SearchService;
import com.hust.mycv.utility.SearchUtility;

@Service
public class SearchServiceImpl implements SearchService {

	@Override
	public SearchPaginationDto filterCvs(List<CvDto> cvs, SearchCvDto dto) {

		// filter language
		if (dto.language != null) {
			cvs = cvs.stream().filter(cv -> cv.language.equals(dto.language)).collect(Collectors.toList());
		}

		// filter gender
		if (dto.gender != null) {
			if (dto.gender.equals("male")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkMale(cv.gender)).collect(Collectors.toList());
			} else if (dto.gender.equals("female")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkFemale(cv.gender)).collect(Collectors.toList());
			}
		}

		// filter marital
		if (dto.marital != null) {
			if (dto.marital.equals("single")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkSingle(cv.marital)).collect(Collectors.toList());
			} else if (dto.marital.equals("married")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkMarried(cv.marital)).collect(Collectors.toList());
			} else if (dto.marital.equals("divorced")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkDivorced(cv.marital)).collect(Collectors.toList());
			} else if (dto.marital.equals("widowed")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkWidowed(cv.marital)).collect(Collectors.toList());
			}
		}

		// filter age
		if (dto.age.length == 2) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkAge(cv.dob, dto.age)).collect(Collectors.toList());
		}

		// filter tag
		if (dto.tag.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkTag(cv.tags, dto.tag)).collect(Collectors.toList());
		}

		// filter address
		if (dto.address.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkAddress(cv.address, dto.address)).collect(Collectors.toList());
		}

		// filter school
		if (dto.school.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkSchool(cv, dto.school)).collect(Collectors.toList());
		}

		// filter field
		if (dto.field.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkField(cv, dto.field)).collect(Collectors.toList());
		}

		// filter company
		if (dto.company.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkCompany(cv, dto.company)).collect(Collectors.toList());
		}

		// filter position
		if (dto.position.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkPosition(cv, dto.position)).collect(Collectors.toList());
		}

		// filter skill
		if (dto.skill.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkSkill(cv, dto.skill)).collect(Collectors.toList());
		}

		List<SearchResultDto> res = new ArrayList<>();

		for (int i = 0; i < cvs.size(); i++) {
			CvDto cv = cvs.get(i);
			String identifier = cv.cvPublic ? cv.identifier : null;
			SearchResultDto result = new SearchResultDto(cv.id, cv.cvName, cv.template, cv.language, cv.fullName, cv.gender, cv.dob, cv.address, cv.phone, identifier);
			res.add(result);
		}
		
		int page = dto.page;
		
		int total = res.size();
		
		res = res.stream()
				 .skip((page - 1)*10)
		         .limit(10)
		         .collect(Collectors.toList());
		
		SearchPaginationDto pagination = new SearchPaginationDto(page, total, res);

		return pagination;

	}

	@Override
	public SearchPaginationDto searchCvs(List<CvDto> cvs, SearchCvDto dto) {

//		// filter language
//		if (dto.language != null) {
//			cvs = cvs.stream().filter(cv -> cv.language.equals(dto.language)).collect(Collectors.toList());
//		}
//
//		// filter gender
//		if (dto.gender != null) {
//			if (dto.gender.equals("male")) {
//				cvs = cvs.stream().filter(cv -> SearchUtility.checkMale(cv.gender)).collect(Collectors.toList());
//			} else if (dto.gender.equals("female")) {
//				cvs = cvs.stream().filter(cv -> SearchUtility.checkFemale(cv.gender)).collect(Collectors.toList());
//			}
//		}
//
//		// filter marital
//		if (dto.marital != null) {
//			if (dto.marital.equals("single")) {
//				cvs = cvs.stream().filter(cv -> SearchUtility.checkSingle(cv.marital)).collect(Collectors.toList());
//			} else if (dto.marital.equals("married")) {
//				cvs = cvs.stream().filter(cv -> SearchUtility.checkMarried(cv.marital)).collect(Collectors.toList());
//			} else if (dto.marital.equals("divorced")) {
//				cvs = cvs.stream().filter(cv -> SearchUtility.checkDivorced(cv.marital)).collect(Collectors.toList());
//			} else if (dto.marital.equals("widowed")) {
//				cvs = cvs.stream().filter(cv -> SearchUtility.checkWidowed(cv.marital)).collect(Collectors.toList());
//			}
//		}
//
//		// filter age
//		if (dto.age.length == 2) {
//			cvs = cvs.stream().filter(cv -> SearchUtility.checkAge(cv.dob, dto.age)).collect(Collectors.toList());
//		}

		List<SearchResultDto> res = new ArrayList<>();

		for (int i = 0; i < cvs.size(); i++) {
			CvDto cv = cvs.get(i);
			String identifier = cv.cvPublic ? cv.identifier : null;
			SearchResultDto result = new SearchResultDto(cv.id, cv.cvName, cv.template, cv.language, cv.fullName, cv.gender, cv.dob, cv.address, cv.phone, identifier);
			res.add(result);
		}
		
		int page = dto.page;
		
		int total = res.size();
		
		res = res.stream()
				 .skip((page - 1)*10)
		         .limit(10)
		         .collect(Collectors.toList());
		
		SearchPaginationDto pagination = new SearchPaginationDto(page, total, res);

		return pagination;

	}

}
