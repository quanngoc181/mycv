package com.hust.mycv.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.hust.mycv.dto.SearchCvDTO;
import com.hust.mycv.dto.SearchResultDTO;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.repository.CvRepository;
import com.hust.mycv.utility.SearchUtility;

@RestController
public class SearchController {

	@Autowired
	CvRepository cvRepository;

	@Autowired
	RestTemplate restTemplate;

	@PostMapping("/search/cv")
	public List<SearchResultDTO> searchCv(@RequestBody SearchCvDTO dto) {
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

		for (int i = 0; i < cvs.size() && i < 10; i++) {
			Cv cv = cvs.get(i);
			String identifier = cv.isCvPublic() ? cv.getIdentifier() : null;
			SearchResultDTO result = new SearchResultDTO(cv.getCvName(), cv.getTemplate(), cv.getLanguage(), cv.getFullName(), cv.getGender(), cv.getDob(), cv.getAddress(), cv.getPhone(), identifier);
			res.add(result);
		}

		return res;
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
