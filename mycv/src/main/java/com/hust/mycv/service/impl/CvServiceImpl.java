package com.hust.mycv.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.PublicCvDto;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.mapper.CvMapper;
import com.hust.mycv.repository.CvRepository;
import com.hust.mycv.service.CvService;

@Service
public class CvServiceImpl implements CvService {

	@Autowired
	CvRepository cvRepository;

	@Override
	public List<CvDto> findByUsername(String username) {

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

		List<CvDto> dtos = new ArrayList<>();

		for (Cv cv : cvs) {
			dtos.add(CvMapper.cvToCvDto(cv));
		}

		return dtos;

	}

	@Override
	public CvDto createCv(CvDto dto, String username) {

		Cv cv = CvMapper.cvDtoToCv(dto);

		cv.setId(null);
		cv.setUsername(username);
		cv.setLastModified(LocalDateTime.now());
		cv.setViewCount(0);
		cv.setDownloadCount(0);
		cv.setIdentifier(UUID.randomUUID().toString());

		Cv retCv = cvRepository.save(cv);

		CvDto retDto = CvMapper.cvToCvDto(retCv);

		return retDto;

	}

	@Override
	public CvDto updateCv(CvDto dto, String username, Integer id) {

		Cv cv = CvMapper.cvDtoToCv(dto);

		cv.setId(id);
		cv.setUsername(username);
		cv.setLastModified(LocalDateTime.now());

		Cv retCv = cvRepository.save(cv);

		CvDto retDto = CvMapper.cvToCvDto(retCv);

		return retDto;

	}

	@Override
	public void deleteById(Integer id) {
		cvRepository.deleteById(id);
	}

	@Override
	public void publicCv(PublicCvDto dto) {

		Cv cv = cvRepository.findById(dto.id).orElse(null);

		if (cv != null) {
			cv.setCvPublic(dto.cvPublic);

			cvRepository.save(cv);
		}

	}

	@Override
	public CvDto viewCv(String identifier) {

		Cv cv = cvRepository.findByIdentifier(identifier);

		Cv skill = cvRepository.fetchSkillsByIdentifier(identifier);
		Cv scholarship = cvRepository.fetchScholarshipsByIdentifier(identifier);
		Cv award = cvRepository.fetchAwardsByIdentifier(identifier);
		Cv certificate = cvRepository.fetchCertificatesByIdentifier(identifier);
		Cv membership = cvRepository.fetchMembershipsByIdentifier(identifier);
		Cv thesis = cvRepository.fetchThesesByIdentifier(identifier);
		Cv education = cvRepository.fetchEducationsByIdentifier(identifier);
		Cv work = cvRepository.fetchWorksByIdentifier(identifier);
		Cv project = cvRepository.fetchProjectsByIdentifier(identifier);

		cv.setSkills(skill.getSkills());
		cv.setScholarships(scholarship.getScholarships());
		cv.setAwards(award.getAwards());
		cv.setCertificates(certificate.getCertificates());
		cv.setMemberships(membership.getMemberships());
		cv.setTheses(thesis.getTheses());
		cv.setEducations(education.getEducations());
		cv.setWorks(work.getWorks());
		cv.setProjects(project.getProjects());

		CvDto dto = CvMapper.cvToCvDto(cv);

		this.addView(identifier);

		return dto;

	}

	@Override
	public void addView(String identifier) {

		Cv cv = cvRepository.findByIdentifier(identifier);

		int oldView = cv.getViewCount() == null ? 0 : cv.getViewCount();
		cv.setViewCount(oldView + 1);

		cvRepository.save(cv);

	}

	@Override
	public void addDownload(String identifier) {

		Cv cv = cvRepository.findByIdentifier(identifier);

		int oldDown = cv.getDownloadCount() == null ? 0 : cv.getDownloadCount();
		cv.setDownloadCount(oldDown + 1);

		cvRepository.save(cv);

	}

	@Override
	public List<CvDto> findAll() {

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

		return dtos;

	}

	@Override
	public CvDto findById(Integer id) {

		Cv cv = cvRepository.findById(id).orElse(null);

		if (cv == null)
			return null;

		Cv skill = cvRepository.fetchSkillsById(id);
		Cv scholarship = cvRepository.fetchScholarshipsById(id);
		Cv award = cvRepository.fetchAwardsById(id);
		Cv certificate = cvRepository.fetchCertificatesById(id);
		Cv membership = cvRepository.fetchMembershipsById(id);
		Cv thesis = cvRepository.fetchThesesById(id);
		Cv education = cvRepository.fetchEducationsById(id);
		Cv work = cvRepository.fetchWorksById(id);
		Cv project = cvRepository.fetchProjectsById(id);

		cv.setSkills(skill.getSkills());
		cv.setScholarships(scholarship.getScholarships());
		cv.setAwards(award.getAwards());
		cv.setCertificates(certificate.getCertificates());
		cv.setMemberships(membership.getMemberships());
		cv.setTheses(thesis.getTheses());
		cv.setEducations(education.getEducations());
		cv.setWorks(work.getWorks());
		cv.setProjects(project.getProjects());

		CvDto dto = CvMapper.cvToCvDto(cv);

		return dto;

	}

	@Override
	public List<CvDto> findByIds(List<Integer> ids) {

		List<CvDto> ret = new ArrayList<>();

		for (Integer id : ids) {
			Cv cv = cvRepository.findById(id).orElse(null);

			if (cv == null)
				continue;

			Cv skill = cvRepository.fetchSkillsById(id);
			Cv scholarship = cvRepository.fetchScholarshipsById(id);
			Cv award = cvRepository.fetchAwardsById(id);
			Cv certificate = cvRepository.fetchCertificatesById(id);
			Cv membership = cvRepository.fetchMembershipsById(id);
			Cv thesis = cvRepository.fetchThesesById(id);
			Cv education = cvRepository.fetchEducationsById(id);
			Cv work = cvRepository.fetchWorksById(id);
			Cv project = cvRepository.fetchProjectsById(id);

			cv.setSkills(skill.getSkills());
			cv.setScholarships(scholarship.getScholarships());
			cv.setAwards(award.getAwards());
			cv.setCertificates(certificate.getCertificates());
			cv.setMemberships(membership.getMemberships());
			cv.setTheses(thesis.getTheses());
			cv.setEducations(education.getEducations());
			cv.setWorks(work.getWorks());
			cv.setProjects(project.getProjects());

			CvDto dto = CvMapper.cvToCvDto(cv);

			ret.add(dto);
		}

		return ret;

	}

}
