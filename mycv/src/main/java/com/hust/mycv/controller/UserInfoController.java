package com.hust.mycv.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
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

import com.hust.mycv.entity.UserInfo;
import com.hust.mycv.repository.UserInfoRepository;
import com.hust.mycv.utility.StringUtility;

@RestController
public class UserInfoController {

	@Autowired
	UserInfoRepository userInfoRepository;

	@GetMapping("/user-info")
	public List<UserInfo> getInfo(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());
		List<UserInfo> infos = userInfoRepository.findByUsername(username);

		List<UserInfo> skills = userInfoRepository.fetchSkillsByUsername(username);
		List<UserInfo> scholarships = userInfoRepository.fetchScholarshipsByUsername(username);
		List<UserInfo> awards = userInfoRepository.fetchAwardsByUsername(username);
		List<UserInfo> certificates = userInfoRepository.fetchCertificatesByUsername(username);
		List<UserInfo> memberships = userInfoRepository.fetchMembershipsByUsername(username);
		List<UserInfo> theses = userInfoRepository.fetchThesesByUsername(username);
		List<UserInfo> presentations = userInfoRepository.fetchPresentationsByUsername(username);
		List<UserInfo> books = userInfoRepository.fetchBooksByUsername(username);
		List<UserInfo> journals = userInfoRepository.fetchJournalsByUsername(username);
		List<UserInfo> educations = userInfoRepository.fetchEducationsByUsername(username);
		List<UserInfo> works = userInfoRepository.fetchWorksByUsername(username);
		List<UserInfo> projects = userInfoRepository.fetchProjectsByUsername(username);

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
			infos.get(i).setBooks(books.get(i).getBooks());
			infos.get(i).setJournals(journals.get(i).getJournals());
			infos.get(i).setPresentations(presentations.get(i).getPresentations());
		}

		return infos;
	}

	@PutMapping("/user-info")
	public UserInfo updateInfo(@RequestBody UserInfo info) {
		UserInfo ret = userInfoRepository.save(info);
		return ret;
	}

	@PostMapping("/user-info/avatar")
	public String updateAvatar(Authentication auth, @RequestParam("file") MultipartFile file) {
		try {
			String username = StringUtility.getUserName(auth.getName());
			List<UserInfo> infos = userInfoRepository.findByUsername(username);

			UserInfo viInfo = infos.get(0);
			UserInfo enInfo = infos.get(1);

			Path path = Paths.get("uploads/avatar");
			Path path1 = Paths.get("uploads/cv");

			String filename = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) + "_" + file.getOriginalFilename();

			Files.copy(file.getInputStream(), path.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
			Files.copy(file.getInputStream(), path1.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

			viInfo.setAvatar(filename);
			enInfo.setAvatar(filename);

			userInfoRepository.save(viInfo);
			userInfoRepository.save(enInfo);

			return filename;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot update avatar.");
		}
	}

}
