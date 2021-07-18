package com.hust.mycv.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.SavedCvDto;
import com.hust.mycv.dto.SearchCvDto;
import com.hust.mycv.dto.SearchResultDto;
import com.hust.mycv.service.CvService;
import com.hust.mycv.service.ElasticService;
import com.hust.mycv.service.SavedService;
import com.hust.mycv.service.SearchService;
import com.hust.mycv.utility.StringUtility;

@RestController
public class EmployerController {

	@Autowired
	ElasticService elasticService;

	@Autowired
	SavedService savedService;

	@Autowired
	CvService cvService;

	@Autowired
	SearchService searchService;

	@PostMapping("/search/keyword")
	public List<SearchResultDto> searchKeyword(@RequestBody SearchCvDto dto) {
		
		List<CvDto> cvs = new ArrayList<>();

		if (dto.keyword == null || dto.keyword.trim().length() == 0) {
			cvs = cvService.findAll();
		} else {
			List<Integer> ids = elasticService.searchCv(dto.keyword);
			cvs = cvService.findByIds(ids);
		}

		List<SearchResultDto> ret = searchService.searchCvs(cvs, dto);
		
		return ret;
		
	}

	@PostMapping("/search/filter")
	public List<SearchResultDto> searchFilter(@RequestBody SearchCvDto dto) {

		List<CvDto> cvs = cvService.findAll();

		List<SearchResultDto> ret = searchService.filterCvs(cvs, dto);

		return ret;

	}

	@GetMapping("/users/current/saved")
	public List<SearchResultDto> fetchSaved(Authentication auth) {

		String username = StringUtility.getUserName(auth.getName());

		List<SearchResultDto> dtos = savedService.findByUsername(username);

		return dtos;

	}

	@PostMapping("/users/current/saved")
	public SearchResultDto saveCv(Authentication auth, @RequestBody SavedCvDto dto) {

		String username = StringUtility.getUserName(auth.getName());

		SearchResultDto ret = savedService.saveCv(username, dto);

		return ret;

	}

	@DeleteMapping("/users/current/saved/{id}")
	public void deleteCv(Authentication auth, @PathVariable Integer id) {

		String username = StringUtility.getUserName(auth.getName());

		savedService.deleteCv(username, id);

	}

	@GetMapping("/suggester/{field}")
	public List<String> suggestField(@PathVariable String field, @RequestParam String keyword) {

		List<String> ret = elasticService.suggestField(field, keyword);

		return ret;

	}

}
