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

import com.hust.mycv.entity.CvInfo;
import com.hust.mycv.repository.CvInfoRepository;
import com.hust.mycv.service.TagService;
import com.hust.mycv.utility.StringUtility;

@RestController
public class CvInfoController {

	@Autowired
	CvInfoRepository cvInfoRepository;

	@Autowired
	TagService tagService;

	@Autowired
	RestTemplate restTemplate;

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
	public CvInfo addInfo(@RequestBody CvInfo info) {

		info.setIdentifier(UUID.randomUUID().toString());
		info.setViewCount(0);
		info.setDownloadCount(0);

		info.setLastModified(LocalDateTime.now());

		tagService.pushTag(info.getTags());

		CvInfo ret = cvInfoRepository.save(info);
		return ret;
	}

	@PutMapping("/cv-info")
	public CvInfo updateInfo(@RequestBody CvInfo info) {

		info.setLastModified(LocalDateTime.now());

		tagService.pushTag(info.getTags());

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
			Path path = Paths.get("uploads/cv");

			String filename = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) + "_" + file.getOriginalFilename();

			Files.copy(file.getInputStream(), path.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

			return filename;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot upload image.");
		}
	}

	@GetMapping("/cvwr/{identifier}")
	public CvInfo viewCv(@PathVariable String identifier) {
		CvInfo info = cvInfoRepository.findByIdentifier(identifier);

		CvInfo skill = cvInfoRepository.fetchSkillsByIdentifier(identifier);
		CvInfo scholarship = cvInfoRepository.fetchScholarshipsByIdentifier(identifier);
		CvInfo award = cvInfoRepository.fetchAwardsByIdentifier(identifier);
		CvInfo certificate = cvInfoRepository.fetchCertificatesByIdentifier(identifier);
		CvInfo membership = cvInfoRepository.fetchMembershipsByIdentifier(identifier);
		CvInfo thesis = cvInfoRepository.fetchThesesByIdentifier(identifier);
		CvInfo education = cvInfoRepository.fetchEducationsByIdentifier(identifier);
		CvInfo work = cvInfoRepository.fetchWorksByIdentifier(identifier);
		CvInfo project = cvInfoRepository.fetchProjectsByIdentifier(identifier);

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

		cvInfoRepository.save(info);

		return info;
	}

	@PostMapping("/cvwr/{identifier}")
	public void addDownload(@PathVariable String identifier) {
		CvInfo info = cvInfoRepository.findByIdentifier(identifier);

		int oldDown = info.getDownloadCount() == null ? 0 : info.getDownloadCount();
		info.setDownloadCount(oldDown + 1);

		cvInfoRepository.save(info);
	}

	@PostMapping("/es/search-tag/{keyword}")
	public String searchTag(@PathVariable String keyword) {
		try {
			String body = "{\n"
						+ "  \"query\": {\n"
						+ "    \"match\": {\n"
						+ "      \"name\": {\n"
						+ "        \"query\": \"" + keyword + "\",\n"
						+ "        \"fuzziness\": \"1\"\n"
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
