package com.hust.mycv.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.Address;
import com.hust.mycv.entity.Company;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.ElasticResponse;
import com.hust.mycv.entity.Field;
import com.hust.mycv.entity.HitsElement;
import com.hust.mycv.entity.HitsSource;
import com.hust.mycv.entity.Position;
import com.hust.mycv.entity.School;
import com.hust.mycv.entity.SkillType;
import com.hust.mycv.entity.Tag;
import com.hust.mycv.mapper.CvMapper;
import com.hust.mycv.repository.AddressRepository;
import com.hust.mycv.repository.CompanyRepository;
import com.hust.mycv.repository.CvRepository;
import com.hust.mycv.repository.ElasticRepository;
import com.hust.mycv.repository.FieldRepository;
import com.hust.mycv.repository.PositionRepository;
import com.hust.mycv.repository.SchoolRepository;
import com.hust.mycv.repository.SkillTypeRepository;
import com.hust.mycv.repository.TagRepository;
import com.hust.mycv.service.ElasticService;

@Service
public class ElasticServiceImpl implements ElasticService {

	@Autowired
	ElasticRepository elasticRepository;

	@Autowired
	CvRepository cvRepository;

	@Autowired
	TagRepository tagRepository;

	@Autowired
	SchoolRepository schoolRepository;

	@Autowired
	CompanyRepository companyRepository;

	@Autowired
	FieldRepository fieldRepository;

	@Autowired
	PositionRepository positionRepository;

	@Autowired
	SkillTypeRepository skillTypeRepository;

	@Autowired
	AddressRepository addressRepository;

	@Override
	public List<String> suggestField(String field, String keyword) {

		ElasticResponse response = elasticRepository.search(field, keyword, "0");

		if (response == null)
			return new ArrayList<>();

		List<String> ret = response.getHits().getHits().stream().map(e -> e.get_source().getName()).collect(Collectors.toList());

		return ret;

	}

	@Scheduled(fixedRate = 60000 * 10)
	public void syncData() {

		elasticRepository.deleteAll("cv");
		elasticRepository.deleteAll("tag");
		elasticRepository.deleteAll("school");
		elasticRepository.deleteAll("field");
		elasticRepository.deleteAll("company");
		elasticRepository.deleteAll("position");
		elasticRepository.deleteAll("skill");
		elasticRepository.deleteAll("address");

		elasticRepository.buldAdd("cv", this.allCvHits());
		elasticRepository.buldAdd("tag", this.allTagHits());
		elasticRepository.buldAdd("school", this.allSchoolHits());
		elasticRepository.buldAdd("field", this.allFieldHits());
		elasticRepository.buldAdd("company", this.allCompanyHits());
		elasticRepository.buldAdd("position", this.allPositionHits());
		elasticRepository.buldAdd("skill", this.allSkillHits());
		elasticRepository.buldAdd("address", this.allAddressHits());

	}

	public List<HitsElement> allCvHits() {

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

		List<CvDto> dtos = new ArrayList<>();

		for (Cv cv : cvs) {
			dtos.add(CvMapper.cvToCvDto(cv));
		}

		List<HitsElement> cvList = dtos.stream().map(e -> new HitsElement(e.id, new HitsSource(e.toString()))).collect(Collectors.toList());

		return cvList;

	}

	public List<HitsElement> allTagHits() {
		List<Tag> tags = tagRepository.findAll();
		List<HitsElement> tagList = tags.stream().map(e -> new HitsElement(e.getId(), new HitsSource(e.getName()))).collect(Collectors.toList());
		return tagList;
	}

	public List<HitsElement> allSchoolHits() {
		List<School> schools = schoolRepository.findAll();
		List<HitsElement> schoolList = schools.stream().map(e -> new HitsElement(e.getId(), new HitsSource(e.getName()))).collect(Collectors.toList());
		return schoolList;
	}

	public List<HitsElement> allFieldHits() {
		List<Field> fields = fieldRepository.findAll();
		List<HitsElement> fieldList = fields.stream().map(e -> new HitsElement(e.getId(), new HitsSource(e.getName()))).collect(Collectors.toList());
		return fieldList;
	}

	public List<HitsElement> allCompanyHits() {
		List<Company> companies = companyRepository.findAll();
		List<HitsElement> companyList = companies.stream().map(e -> new HitsElement(e.getId(), new HitsSource(e.getName()))).collect(Collectors.toList());
		return companyList;
	}

	public List<HitsElement> allPositionHits() {
		List<Position> positions = positionRepository.findAll();
		List<HitsElement> positionList = positions.stream().map(e -> new HitsElement(e.getId(), new HitsSource(e.getName()))).collect(Collectors.toList());
		return positionList;
	}

	public List<HitsElement> allSkillHits() {
		List<SkillType> skills = skillTypeRepository.findAll();
		List<HitsElement> skillList = skills.stream().map(e -> new HitsElement(e.getId(), new HitsSource(e.getName()))).collect(Collectors.toList());
		return skillList;
	}

	public List<HitsElement> allAddressHits() {
		List<Address> addresses = addressRepository.findAll();
		List<HitsElement> addressList = addresses.stream().map(e -> new HitsElement(e.getId(), new HitsSource(e.getName()))).collect(Collectors.toList());
		return addressList;
	}

	@Override
	public List<Integer> searchCv(String keyword) {

		ElasticResponse response = elasticRepository.search("cv", keyword, "1");

		if (response == null)
			return new ArrayList<>();

		List<Integer> ret = response.getHits().getHits().stream().map(e -> e.get_id()).collect(Collectors.toList());

		return ret;

	}

}
