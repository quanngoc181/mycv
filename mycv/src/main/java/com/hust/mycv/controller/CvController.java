package com.hust.mycv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.PublicCvDto;
import com.hust.mycv.service.AddressService;
import com.hust.mycv.service.CompanyService;
import com.hust.mycv.service.CvService;
import com.hust.mycv.service.FieldService;
import com.hust.mycv.service.PositionService;
import com.hust.mycv.service.SchoolService;
import com.hust.mycv.service.SkillTypeService;
import com.hust.mycv.service.TagService;
import com.hust.mycv.utility.StringUtility;

@RestController
public class CvController {

	@Autowired
	CvService cvService;

	@Autowired
	TagService tagService;

	@Autowired
	SchoolService schoolService;

	@Autowired
	CompanyService companyService;

	@Autowired
	FieldService fieldService;

	@Autowired
	PositionService positionService;

	@Autowired
	SkillTypeService skillTypeService;

	@Autowired
	AddressService addressService;

	@GetMapping("/users/current/cvs")
	public List<CvDto> getCv(Authentication auth) {

		String username = StringUtility.getUserName(auth.getName());

		List<CvDto> dtos = cvService.findByUsername(username);

		return dtos;

	}

	@PostMapping("/users/current/cvs")
	public CvDto createCv(Authentication auth, @RequestBody CvDto dto) {

		String username = StringUtility.getUserName(auth.getName());

		CvDto ret = cvService.createCv(dto, username);

		tagService.updateTag(ret);
		schoolService.updateSchool(ret);
		companyService.updateCompany(ret);
		fieldService.updateField(ret);
		positionService.updatePosition(ret);
		skillTypeService.updateSkill(ret);
		addressService.updateAddress(ret);

		return ret;

	}

	@PutMapping("/users/current/cvs/{id}")
	public CvDto updateCv(Authentication auth, @RequestBody CvDto dto, @PathVariable Integer id) {

		String username = StringUtility.getUserName(auth.getName());

		CvDto ret = cvService.updateCv(dto, username, id);

		tagService.updateTag(ret);
		schoolService.updateSchool(ret);
		companyService.updateCompany(ret);
		fieldService.updateField(ret);
		positionService.updatePosition(ret);
		skillTypeService.updateSkill(ret);
		addressService.updateAddress(ret);

		return ret;

	}

	@DeleteMapping("/users/current/cvs/{id}")
	public void deleteCv(@PathVariable Integer id) {

		cvService.deleteById(id);

	}

	@PostMapping("/users/current/cvs/public-cv")
	public PublicCvDto publicCv(@RequestBody PublicCvDto dto) {

		cvService.publicCv(dto);
		
		return dto;

	}

	@GetMapping("/cvs/{identifier}")
	public CvDto viewCv(@PathVariable String identifier) {

		CvDto dto = cvService.findByIdentifier(identifier);

		cvService.addView(identifier);

		return dto;

	}

	@PostMapping("/cvs/download-cv")
	public void downloadCv(@RequestParam String identifier) {
		
		cvService.addDownload(identifier);
		
	}

}
