package com.hust.mycv.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.dto.ReceiverInfoDto;
import com.hust.mycv.dto.UserInfoDto;
import com.hust.mycv.entity.Info;
import com.hust.mycv.mapper.InfoMapper;
import com.hust.mycv.repository.InfoRepository;
import com.hust.mycv.service.InfoService;

@Service
public class InfoServiceImpl implements InfoService {

	@Autowired
	InfoRepository infoRepository;

	@Override
	public UserInfoDto findByUsername(String username) {

		List<Info> infos = infoRepository.findByUsername(username);

		List<Info> skills = infoRepository.fetchSkillsByUsername(username);
		List<Info> scholarships = infoRepository.fetchScholarshipsByUsername(username);
		List<Info> awards = infoRepository.fetchAwardsByUsername(username);
		List<Info> certificates = infoRepository.fetchCertificatesByUsername(username);
		List<Info> memberships = infoRepository.fetchMembershipsByUsername(username);
		List<Info> theses = infoRepository.fetchThesesByUsername(username);
		List<Info> presentations = infoRepository.fetchPresentationsByUsername(username);
		List<Info> books = infoRepository.fetchBooksByUsername(username);
		List<Info> journals = infoRepository.fetchJournalsByUsername(username);
		List<Info> educations = infoRepository.fetchEducationsByUsername(username);
		List<Info> works = infoRepository.fetchWorksByUsername(username);
		List<Info> projects = infoRepository.fetchProjectsByUsername(username);

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

		UserInfoDto dto = new UserInfoDto();

		for (Info info : infos) {
			if (info.getLanguage().equals("vi")) {
				dto.viInfo = InfoMapper.infoToInfoDto(info);
			} else if (info.getLanguage().equals("en")) {
				dto.enInfo = InfoMapper.infoToInfoDto(info);
			}
		}

		return dto;

	}

	@Override
	public UserInfoDto updateByUsername(String username, UserInfoDto dto) {

		List<Info> infos = infoRepository.findByUsername(username);

		UserInfoDto ret = new UserInfoDto();

		for (Info info : infos) {
			if (info.getLanguage().equals("vi")) {
				Info viInfo = InfoMapper.infoDtoToInfo(dto.viInfo);

				viInfo.setUsername(username);
				viInfo.setId(info.getId());
				viInfo.setLanguage("vi");

				Info viRet = infoRepository.save(viInfo);
				ret.viInfo = InfoMapper.infoToInfoDto(viRet);
			} else if (info.getLanguage().equals("en")) {
				Info enInfo = InfoMapper.infoDtoToInfo(dto.enInfo);

				enInfo.setUsername(username);
				enInfo.setId(info.getId());
				enInfo.setLanguage("en");

				Info enRet = infoRepository.save(enInfo);
				ret.enInfo = InfoMapper.infoToInfoDto(enRet);
			}
		}

		return ret;

	}

	@Override
	public void changeAvatar(String username, String filename) {

		List<Info> infos = infoRepository.findByUsername(username);

		Info viInfo = infos.get(0);
		Info enInfo = infos.get(1);

		viInfo.setAvatar(filename);
		enInfo.setAvatar(filename);

		infoRepository.save(viInfo);
		infoRepository.save(enInfo);

	}

	@Override
	public ReceiverInfoDto findReceiverByUsername(String current, String username) {

		if (current.equals(username))
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không thể tặng cho chính mình.");

		List<Info> infos = infoRepository.findByUsername(username);

		if (infos.size() == 0) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không tìm thấy tài khoản.");
		} else {
			Info info = infos.get(0);
			ReceiverInfoDto dto = new ReceiverInfoDto();

			dto.username = info.getUsername();
			dto.fullName = info.getFullName();
			dto.avatar = info.getAvatar() == null ? "default-avatar.png" : info.getAvatar();

			return dto;
		}

	}

}
