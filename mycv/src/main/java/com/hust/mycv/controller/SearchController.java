package com.hust.mycv.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.dto.ElasticResponse;
import com.hust.mycv.dto.HitsElement;
import com.hust.mycv.dto.SearchCvDTO;
import com.hust.mycv.dto.SearchResultDTO;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.SavedCv;
import com.hust.mycv.repository.CvRepository;
import com.hust.mycv.repository.SavedCvRepository;
import com.hust.mycv.utility.SearchUtility;
import com.hust.mycv.utility.StringUtility;

@RestController
public class SearchController {

	@Autowired
	CvRepository cvRepository;

	@Autowired
	SavedCvRepository savedCvRepository;

	@Autowired
	RestTemplate restTemplate;

	@PostMapping("/search/keyword")
	public List<SearchResultDTO> searchKeyword(@RequestBody SearchCvDTO dto) {
		List<Cv> cvs = new ArrayList<>();

		if (dto.keyword == null || dto.keyword.trim().length() == 0) {
			cvs = cvRepository.findAll();
			List<Cv> skills = cvRepository.fetchSkills();
			List<Cv> scholarships = cvRepository.fetchScholarships();
			List<Cv> awards = cvRepository.fetchAwards();
			List<Cv> certificates = cvRepository.fetchCertificates();
			List<Cv> memberships = cvRepository.fetchMemberships();
			List<Cv> theses = cvRepository.fetchTheses();
			List<Cv> educations = cvRepository.fetchEducations();
			List<Cv> works = cvRepository.fetchWorks();
			List<Cv> projects = cvRepository.fetchProjects();

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
		} else {
			try {
				String body = "{\n"
						+ "  \"query\": {\n"
						+ "    \"match\": {\n"
						+ "      \"name\": {\n"
						+ "        \"query\": \"" + dto.keyword + "\",\n"
						+ "        \"fuzziness\": \"1\"\n"
						+ "      }\n"
						+ "    }\n"
						+ "  }\n"
						+ "}";

				RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/cv/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

				ResponseEntity<ElasticResponse> response = restTemplate.exchange(request, ElasticResponse.class);

				ElasticResponse er = response.getBody();

				for (HitsElement hit : er.hits.hits) {
					Cv cv = cvRepository.findById(hit._id).orElse(null);

					if (cv == null)
						continue;

					Cv skill = cvRepository.fetchSkillsById(hit._id);
					Cv scholarship = cvRepository.fetchScholarshipsById(hit._id);
					Cv award = cvRepository.fetchAwardsById(hit._id);
					Cv certificate = cvRepository.fetchCertificatesById(hit._id);
					Cv membership = cvRepository.fetchMembershipsById(hit._id);
					Cv thesis = cvRepository.fetchThesesById(hit._id);
					Cv education = cvRepository.fetchEducationsById(hit._id);
					Cv work = cvRepository.fetchWorksById(hit._id);
					Cv project = cvRepository.fetchProjectsById(hit._id);

					cv.setSkills(skill.getSkills());
					cv.setScholarships(scholarship.getScholarships());
					cv.setAwards(award.getAwards());
					cv.setCertificates(certificate.getCertificates());
					cv.setMemberships(membership.getMemberships());
					cv.setTheses(thesis.getTheses());
					cv.setEducations(education.getEducations());
					cv.setWorks(work.getWorks());
					cv.setProjects(project.getProjects());

					cvs.add(cv);
				}
			} catch (Exception e) {
				System.out.println(e);
			}
		}

		// filter language
		if (dto.language != null) {
			cvs = cvs.stream().filter(cv -> cv.getLanguage().equals(dto.language)).collect(Collectors.toList());
		}

		// filter gender
		if (dto.gender != null) {
			if (dto.gender.equals("male")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkMale(cv.getGender())).collect(Collectors.toList());
			} else if (dto.gender.equals("female")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkFemale(cv.getGender())).collect(Collectors.toList());
			}
		}

		// filter marital
		if (dto.marital != null) {
			if (dto.marital.equals("single")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkSingle(cv.getMarital())).collect(Collectors.toList());
			} else if (dto.marital.equals("married")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkMarried(cv.getMarital())).collect(Collectors.toList());
			} else if (dto.marital.equals("divorced")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkDivorced(cv.getMarital())).collect(Collectors.toList());
			} else if (dto.marital.equals("widowed")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkWidowed(cv.getMarital())).collect(Collectors.toList());
			}
		}

		// filter age
		if (dto.age.length == 2) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkAge(cv.getDob(), dto.age)).collect(Collectors.toList());
		}

		List<SearchResultDTO> res = new ArrayList<>();

		for (int i = 0; i < cvs.size(); i++) {
			Cv cv = cvs.get(i);
			String identifier = cv.isCvPublic() ? cv.getIdentifier() : null;
			SearchResultDTO result = new SearchResultDTO(cv.getId(), cv.getCvName(), cv.getTemplate(), cv.getLanguage(), cv.getFullName(), cv.getGender(), cv.getDob(), cv.getAddress(), cv.getPhone(), identifier);
			res.add(result);
		}

		return res;
	}

	@PostMapping("/search/filter")
	public List<SearchResultDTO> searchFilter(@RequestBody SearchCvDTO dto) {
		List<Cv> cvs = cvRepository.findAll();
		List<Cv> skills = cvRepository.fetchSkills();
		List<Cv> scholarships = cvRepository.fetchScholarships();
		List<Cv> awards = cvRepository.fetchAwards();
		List<Cv> certificates = cvRepository.fetchCertificates();
		List<Cv> memberships = cvRepository.fetchMemberships();
		List<Cv> theses = cvRepository.fetchTheses();
		List<Cv> educations = cvRepository.fetchEducations();
		List<Cv> works = cvRepository.fetchWorks();
		List<Cv> projects = cvRepository.fetchProjects();

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

		// filter language
		if (dto.language != null) {
			cvs = cvs.stream().filter(cv -> cv.getLanguage().equals(dto.language)).collect(Collectors.toList());
		}

		// filter gender
		if (dto.gender != null) {
			if (dto.gender.equals("male")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkMale(cv.getGender())).collect(Collectors.toList());
			} else if (dto.gender.equals("female")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkFemale(cv.getGender())).collect(Collectors.toList());
			}
		}

		// filter marital
		if (dto.marital != null) {
			if (dto.marital.equals("single")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkSingle(cv.getMarital())).collect(Collectors.toList());
			} else if (dto.marital.equals("married")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkMarried(cv.getMarital())).collect(Collectors.toList());
			} else if (dto.marital.equals("divorced")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkDivorced(cv.getMarital())).collect(Collectors.toList());
			} else if (dto.marital.equals("widowed")) {
				cvs = cvs.stream().filter(cv -> SearchUtility.checkWidowed(cv.getMarital())).collect(Collectors.toList());
			}
		}

		// filter age
		if (dto.age.length == 2) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkAge(cv.getDob(), dto.age)).collect(Collectors.toList());
		}

		// filter tag
		if (dto.tag.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkTag(cv.getTags(), dto.tag)).collect(Collectors.toList());
		}

		// filter address
		if (dto.address.length > 0) {
			cvs = cvs.stream().filter(cv -> SearchUtility.checkAddress(cv.getAddress(), dto.address)).collect(Collectors.toList());
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

		List<SearchResultDTO> res = new ArrayList<>();

		for (int i = 0; i < cvs.size(); i++) {
			Cv cv = cvs.get(i);
			String identifier = cv.isCvPublic() ? cv.getIdentifier() : null;
			SearchResultDTO result = new SearchResultDTO(cv.getId(), cv.getCvName(), cv.getTemplate(), cv.getLanguage(), cv.getFullName(), cv.getGender(), cv.getDob(), cv.getAddress(), cv.getPhone(), identifier);
			res.add(result);
		}

		return res;
	}

	@GetMapping("/save")
	public List<SearchResultDTO> fetchCv(Authentication auth) {
		String username = StringUtility.getUserName(auth.getName());

		List<SavedCv> saveList = savedCvRepository.findByUsername(username);

		List<SearchResultDTO> result = new ArrayList<>();

		for (SavedCv savedCv : saveList) {
			Cv cv = cvRepository.findById(savedCv.getCvId()).orElse(null);

			if (cv != null) {
				String identifier = cv.isCvPublic() ? cv.getIdentifier() : null;
				SearchResultDTO dto = new SearchResultDTO(cv.getId(), cv.getCvName(), cv.getTemplate(), cv.getLanguage(), cv.getFullName(), cv.getGender(), cv.getDob(), cv.getAddress(), cv.getPhone(), identifier);
				result.add(dto);
			}
		}

		return result;
	}

	@PostMapping("/save/{cvId}")
	public SearchResultDTO searchCv(Authentication auth, @PathVariable Integer cvId) {
		String username = StringUtility.getUserName(auth.getName());

		Cv cv = cvRepository.findById(cvId).orElse(null);

		if (cv == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find cv.");

		SavedCv saved = savedCvRepository.findByUsernameAndCvId(username, cvId);

		if (saved == null) {
			SavedCv newCv = new SavedCv();
			newCv.setCvId(cvId);
			newCv.setUsername(username);

			savedCvRepository.save(newCv);
		} else {
			savedCvRepository.delete(saved);
		}

		String identifier = cv.isCvPublic() ? cv.getIdentifier() : null;
		SearchResultDTO dto = new SearchResultDTO(cv.getId(), cv.getCvName(), cv.getTemplate(), cv.getLanguage(), cv.getFullName(), cv.getGender(), cv.getDob(), cv.getAddress(), cv.getPhone(), identifier);

		return dto;
	}

	@PostMapping("/search/tag/{keyword}")
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

	@PostMapping("/search/address/{keyword}")
	public String searchAddress(@PathVariable String keyword) {
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

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/address/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<String> response = restTemplate.exchange(request, String.class);

			return response.getBody();
		} catch (Exception e) {
			System.out.println(e);
		}

		return "null";
	}

	@PostMapping("/search/school/{keyword}")
	public String searchSchool(@PathVariable String keyword) {
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

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/school/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<String> response = restTemplate.exchange(request, String.class);

			return response.getBody();
		} catch (Exception e) {
			System.out.println(e);
		}

		return "null";
	}

	@PostMapping("/search/field/{keyword}")
	public String searchField(@PathVariable String keyword) {
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

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/field/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<String> response = restTemplate.exchange(request, String.class);

			return response.getBody();
		} catch (Exception e) {
			System.out.println(e);
		}

		return "null";
	}

	@PostMapping("/search/company/{keyword}")
	public String searchCompany(@PathVariable String keyword) {
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

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/company/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<String> response = restTemplate.exchange(request, String.class);

			return response.getBody();
		} catch (Exception e) {
			System.out.println(e);
		}

		return "null";
	}

	@PostMapping("/search/position/{keyword}")
	public String searchPosition(@PathVariable String keyword) {
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

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/position/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<String> response = restTemplate.exchange(request, String.class);

			return response.getBody();
		} catch (Exception e) {
			System.out.println(e);
		}

		return "null";
	}

	@PostMapping("/search/skill/{keyword}")
	public String searchSkill(@PathVariable String keyword) {
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

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/skill/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<String> response = restTemplate.exchange(request, String.class);

			return response.getBody();
		} catch (Exception e) {
			System.out.println(e);
		}

		return "null";
	}

}
