package com.hust.mycv.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.dto.SavedCvDto;
import com.hust.mycv.dto.SearchResultDto;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.SavedCv;
import com.hust.mycv.repository.CvRepository;
import com.hust.mycv.repository.SavedRepository;
import com.hust.mycv.service.SavedService;

@Service
public class SavedServiceImpl implements SavedService {
	
	@Autowired
	CvRepository cvRepository;
	
	@Autowired
	SavedRepository savedRepository;

	@Override
	public List<SearchResultDto> findByUsername(String username) {

		List<SavedCv> saveList = savedRepository.findByUsername(username);

		List<SearchResultDto> result = new ArrayList<>();

		for (SavedCv savedCv : saveList) {
			Cv cv = cvRepository.findById(savedCv.getCvId()).orElse(null);

			if (cv != null) {
				String identifier = cv.isCvPublic() ? cv.getIdentifier() : null;
				SearchResultDto dto = new SearchResultDto(cv.getId(), cv.getCvName(), cv.getTemplate(), cv.getLanguage(), cv.getFullName(), cv.getGender(), cv.getDob(), cv.getAddress(), cv.getPhone(), identifier);
				result.add(dto);
			}
		}

		return result;
		
	}

	@Override
	public SearchResultDto saveCv(String username, SavedCvDto dto) {

		Cv cv = cvRepository.findById(dto.cvId).orElse(null);

		if (cv == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cannot find cv.");

		SavedCv saved = savedRepository.findByUsernameAndCvId(username, dto.cvId);

		if (saved == null) {
			SavedCv newCv = new SavedCv();
			newCv.setCvId(dto.cvId);
			newCv.setUsername(username);

			savedRepository.save(newCv);
		}

		String identifier = cv.isCvPublic() ? cv.getIdentifier() : null;
		SearchResultDto ret = new SearchResultDto(cv.getId(), cv.getCvName(), cv.getTemplate(), cv.getLanguage(), cv.getFullName(), cv.getGender(), cv.getDob(), cv.getAddress(), cv.getPhone(), identifier);

		return ret;
		
	}

	@Override
	public void deleteCv(String username, Integer id) {

		SavedCv saved = savedRepository.findByUsernameAndCvId(username, id);
		
		if(saved != null) {
			savedRepository.delete(saved);
		}
		
	}

}
