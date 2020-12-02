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
import com.hust.mycv.entity.Book;
import com.hust.mycv.entity.Certificate;
import com.hust.mycv.entity.Membership;
import com.hust.mycv.entity.Presentation;
import com.hust.mycv.entity.Scholarship;
import com.hust.mycv.entity.Skill;
import com.hust.mycv.entity.Thesis;
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
		UserInfo certificate = userInfoRepository.fetchCertificatesByUsername(username);
		UserInfo membership = userInfoRepository.fetchMembershipsByUsername(username);
		UserInfo thesis = userInfoRepository.fetchThesesByUsername(username);
		UserInfo presentation = userInfoRepository.fetchPresentationsByUsername(username);
		UserInfo book = userInfoRepository.fetchBooksByUsername(username);
		info.setScholarships(scholarship.getScholarships());
		info.setAwards(award.getAwards());
		info.setCertificates(certificate.getCertificates());
		info.setMemberships(membership.getMemberships());
		info.setTheses(thesis.getTheses());
		info.setPresentations(presentation.getPresentations());
		info.setBooks(book.getBooks());
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
	
	@PutMapping("/user-info/certificates")
	public List<Certificate> updateCertificates(Authentication auth, @RequestBody List<Certificate> certificates) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchCertificatesByUsername(username);
		
		info.setCertificates(certificates);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getCertificates();
	}
	
	@PutMapping("/user-info/memberships")
	public List<Membership> updateMemberships(Authentication auth, @RequestBody List<Membership> memberships) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchMembershipsByUsername(username);
		
		info.setMemberships(memberships);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getMemberships();
	}
	
	@PutMapping("/user-info/theses")
	public List<Thesis> updateTheses(Authentication auth, @RequestBody List<Thesis> theses) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchThesesByUsername(username);
		
		info.setTheses(theses);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getTheses();
	}
	
	@PutMapping("/user-info/presentations")
	public List<Presentation> updatePresentations(Authentication auth, @RequestBody List<Presentation> presentations) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchPresentationsByUsername(username);
		
		info.setPresentations(presentations);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getPresentations();
	}
	
	@PutMapping("/user-info/books")
	public List<Book> updateBooks(Authentication auth, @RequestBody List<Book> books) {
		String username = StringUtility.getUserName(auth.getName());
		UserInfo info = userInfoRepository.fetchBooksByUsername(username);
		
		info.setBooks(books);
		
		UserInfo ret = userInfoRepository.save(info);

		return ret.getBooks();
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
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot update avatar.");
		}
	}

}
