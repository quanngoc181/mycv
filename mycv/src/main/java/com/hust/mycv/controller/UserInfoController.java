package com.hust.mycv.controller;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.entity.Award;
import com.hust.mycv.entity.Scholarship;
import com.hust.mycv.entity.Skill;
import com.hust.mycv.entity.UserInfo;
import com.hust.mycv.repository.UserInfoRepository;
import com.hust.mycv.utility.StringUtility;

@RestController
public class UserInfoController {

	@Autowired
	UserInfoRepository userInfoRepository;

	@GetMapping("/user-info")
	public UserInfo getInfo(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchSkillsByUsername(username);
		UserInfo scholarship = userInfoRepository.fetchScholarshipsByUsername(username);
		UserInfo award = userInfoRepository.fetchAwardsByUsername(username);
		info.setScholarships(scholarship.getScholarships());
		info.setAwards(award.getAwards());
		return info;
	}

	@PutMapping("/user-info")
	public UserInfo updateInfo(@RequestBody UserInfo info) {
		UserInfo ret = userInfoRepository.save(info);
		return ret;
	}
	
	@PutMapping("/user-info/skills")
	public List<Skill> updateSkills(Authentication auth, @RequestBody List<Skill> skills) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchSkillsByUsername(username);
		
		info.setSkills(skills);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getSkills();
	}
	
	@PutMapping("/user-info/scholarships")
	public List<Scholarship> updateScholarships(Authentication auth, @RequestBody List<Scholarship> scholarship) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchScholarshipsByUsername(username);
		
		info.setScholarships(scholarship);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getScholarships();
	}
	
	@PutMapping("/user-info/awards")
	public List<Award> updateAwards(Authentication auth, @RequestBody List<Award> awards) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchAwardsByUsername(username);
		
		info.setAwards(awards);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getAwards();
	}

	@PostMapping("/user-info/avatar")
	public String updateAvatar(Authentication auth, @RequestParam("file") MultipartFile file) {
		try {
			byte[] bytes = file.getBytes();

			String username = StringUtility.getUserName(auth.getName());
			UserInfo info = userInfoRepository.findByUsername(username);

			info.setAvatar(bytes);

			userInfoRepository.save(info);

			return Base64.getEncoder().encodeToString(bytes);
		} catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot update avatar.");
		}
	}

}
