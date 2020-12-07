package com.hust.mycv.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.entity.CvInfo;
import com.hust.mycv.entity.UserInfo;
import com.hust.mycv.repository.CvInfoRepository;
import com.hust.mycv.repository.UserInfoRepository;
import com.hust.mycv.utility.StringUtility;

@RestController
public class CvInfoController {
	
	@Autowired
	UserInfoRepository userInfoRepository;
	
	@Autowired
	CvInfoRepository cvInfoRepository;
	
	@GetMapping("/cv-info")
	public List<CvInfo> getInfo(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());
		List<CvInfo> infos = cvInfoRepository.findByUsername(username);
		
		List<CvInfo> skills = cvInfoRepository.fetchSkillsByUsername(username);
		List<CvInfo> scholarships = cvInfoRepository.fetchScholarshipsByUsername(username);
		List<CvInfo> awards = cvInfoRepository.fetchAwardsByUsername(username);
		List<CvInfo> certificates = cvInfoRepository.fetchCertificatesByUsername(username);
		List<CvInfo> memberships = cvInfoRepository.fetchMembershipsByUsername(username);
		List<CvInfo> theses = cvInfoRepository.fetchThesesByUsername(username);
		List<CvInfo> educations = cvInfoRepository.fetchEducationsByUsername(username);
		List<CvInfo> works = cvInfoRepository.fetchWorksByUsername(username);
		List<CvInfo> projects = cvInfoRepository.fetchProjectsByUsername(username);
		
		for (int i = 0; i < infos.size(); i++) {
			infos.get(i).setSkills(skills.get(i).getSkills());
			infos.get(i).setScholarships(scholarships.get(i).getScholarships());
			infos.get(i).setAwards(awards.get(i).getAwards());
			infos.get(i).setCertificates(certificates.get(i).getCertificates());
			infos.get(i).setMemberships(memberships.get(i).getMemberships());
			infos.get(i).setTheses(theses.get(i).getTheses());
			infos.get(i).setEducations(educations.get(i).getEducations());
			infos.get(i).setWorks(works.get(i).getWorks());
			infos.get(i).setProjects(projects.get(i).getProjects());
		}
		
		return infos;
	}
	
	@PostMapping("/cv-info")
	public CvInfo updateInfo(@RequestBody CvInfo info) {
		
		info.setLastModified(LocalDateTime.now());
		
		CvInfo ret = cvInfoRepository.save(info);
		return ret;
	}
	
	@DeleteMapping("/cv-info")
	public void deleteInfo(@RequestBody CvInfo info) {
		cvInfoRepository.delete(info);
	}
	
	@PostMapping("/cv-info/upload-image")
	public String updateImage(Authentication auth, @RequestParam("file") MultipartFile file) {
		try {
			String username = StringUtility.getUserName(auth.getName());
			UserInfo info = userInfoRepository.findByUsername(username);
			
			Path path = Paths.get("uploads/cv");
			
			String filename = info.getId() + file.getOriginalFilename();
			
			Files.copy(file.getInputStream(), path.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

			return filename;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot upload image.");
		}
	}

}
