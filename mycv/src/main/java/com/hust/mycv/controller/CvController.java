package com.hust.mycv.controller;

import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.entity.Cv;
import com.hust.mycv.repository.CvRepository;
import com.hust.mycv.service.AddressService;
import com.hust.mycv.service.CompanyService;
import com.hust.mycv.service.FieldService;
import com.hust.mycv.service.PositionService;
import com.hust.mycv.service.SchoolService;
import com.hust.mycv.service.SkillTypeService;
import com.hust.mycv.service.TagService;
import com.hust.mycv.utility.StringUtility;

@RestController
public class CvController {

	@Autowired
	CvRepository cvRepository;

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

	@Autowired
	RestTemplate restTemplate;

	@GetMapping("/cv")
	public List<Cv> getInfo(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());
		
		List<Cv> cvs = cvRepository.findByUsername(username);
		List<Cv> skills = cvRepository.fetchSkillsByUsername(username);
		List<Cv> scholarships = cvRepository.fetchScholarshipsByUsername(username);
		List<Cv> awards = cvRepository.fetchAwardsByUsername(username);
		List<Cv> certificates = cvRepository.fetchCertificatesByUsername(username);
		List<Cv> memberships = cvRepository.fetchMembershipsByUsername(username);
		List<Cv> theses = cvRepository.fetchThesesByUsername(username);
		List<Cv> educations = cvRepository.fetchEducationsByUsername(username);
		List<Cv> works = cvRepository.fetchWorksByUsername(username);
		List<Cv> projects = cvRepository.fetchProjectsByUsername(username);

		for (int i = 0; i < cvs.size(); i++) {
			cvs.get(i).setSkills(skills.get(i).getSkills());
			cvs.get(i).setScholarships(scholarships.get(i).getScholarships());
			cvs.get(i).setAwards(awards.get(i).getAwards());
			cvs.get(i).setCertificates(certificates.get(i).getCertificates());
			cvs.get(i).setMemberships(memberships.get(i).getMemberships());
			cvs.get(i).setTheses(theses.get(i).getTheses());
			cvs.get(i).setEducations(educations.get(i).getEducations());
			cvs.get(i).setWorks(works.get(i).getWorks());
			cvs.get(i).setProjects(projects.get(i).getProjects());
		}

		return cvs;
	}

	@PostMapping("/cv")
	public Cv addInfo(@RequestBody Cv cv) {
		cv.setIdentifier(UUID.randomUUID().toString());
		cv.setViewCount(0);
		cv.setDownloadCount(0);

		cv.setLastModified(LocalDateTime.now());
		
		tagService.updateTag(cv);
		schoolService.updateSchool(cv);
		companyService.updateCompany(cv);
		fieldService.updateField(cv);
		positionService.updatePosition(cv);
		skillTypeService.updateSkill(cv);
		addressService.updateAddress(cv);

		Cv ret = cvRepository.save(cv);

		return ret;
	}

	@PutMapping("/cv")
	public Cv updateInfo(@RequestBody Cv cv) {
		cv.setLastModified(LocalDateTime.now());
		
		tagService.updateTag(cv);
		schoolService.updateSchool(cv);
		companyService.updateCompany(cv);
		fieldService.updateField(cv);
		positionService.updatePosition(cv);
		skillTypeService.updateSkill(cv);
		addressService.updateAddress(cv);

		Cv ret = cvRepository.save(cv);

		return ret;
	}

	@DeleteMapping("/cv")
	public void deleteInfo(@RequestBody Cv cv) {
		cvRepository.delete(cv);
	}

	@PostMapping("/cv/upload-image")
	public String updateImage(Authentication auth, @RequestParam("file") MultipartFile file) {
		try {
			Path path = Paths.get("uploads/cv");

			String filename = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) + "_" + file.getOriginalFilename();

			Files.copy(file.getInputStream(), path.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

			return filename;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot upload image.");
		}
	}

	@GetMapping("/cvwr/{identifier}")
	public Cv viewCv(@PathVariable String identifier) {
		Cv info = cvRepository.findByIdentifier(identifier);

		Cv skill = cvRepository.fetchSkillsByIdentifier(identifier);
		Cv scholarship = cvRepository.fetchScholarshipsByIdentifier(identifier);
		Cv award = cvRepository.fetchAwardsByIdentifier(identifier);
		Cv certificate = cvRepository.fetchCertificatesByIdentifier(identifier);
		Cv membership = cvRepository.fetchMembershipsByIdentifier(identifier);
		Cv thesis = cvRepository.fetchThesesByIdentifier(identifier);
		Cv education = cvRepository.fetchEducationsByIdentifier(identifier);
		Cv work = cvRepository.fetchWorksByIdentifier(identifier);
		Cv project = cvRepository.fetchProjectsByIdentifier(identifier);

		info.setSkills(skill.getSkills());
		info.setScholarships(scholarship.getScholarships());
		info.setAwards(award.getAwards());
		info.setCertificates(certificate.getCertificates());
		info.setMemberships(membership.getMemberships());
		info.setTheses(thesis.getTheses());
		info.setEducations(education.getEducations());
		info.setWorks(work.getWorks());
		info.setProjects(project.getProjects());

		int oldView = info.getViewCount() == null ? 0 : info.getViewCount();
		info.setViewCount(oldView + 1);

		cvRepository.save(info);

		return info;
	}

	@PostMapping("/cvwr/{identifier}")
	public void addDownload(@PathVariable String identifier) {
		Cv info = cvRepository.findByIdentifier(identifier);

		int oldDown = info.getDownloadCount() == null ? 0 : info.getDownloadCount();
		info.setDownloadCount(oldDown + 1);

		cvRepository.save(info);
	}

	@PostMapping("/es/search-tag/{keyword}")
	public String searchTag(@PathVariable String keyword) {
		try {
			String body = "{\n"
					+ "  \"query\": {\n"
					+ "    \"match\": {\n"
					+ "      \"name\": {\n"
					+ "        \"query\": \"" + keyword + "\"\n"
//						+ "        \"fuzziness\": \"1\"\n"
					+ "      }\n"
					+ "    }\n"
					+ "  },\n"
					+ "  \"size\": 5\n"
					+ "}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/tag/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<String> response = restTemplate.exchange(request, String.class);

			return response.getBody();
		} catch (Exception e) {
			System.out.println(e);
		}

		return "null";
	}

}
