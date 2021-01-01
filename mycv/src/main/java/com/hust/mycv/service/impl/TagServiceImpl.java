package com.hust.mycv.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.Tag;
import com.hust.mycv.repository.TagRepository;
import com.hust.mycv.service.TagService;

@Service
public class TagServiceImpl implements TagService {

	@Autowired
	TagRepository tagRepository;

	public void updateTag(CvDto dto) {
		List<String> tags = dto.tags;

		for (String tag : tags) {
			if (tag != null) {
				tag = tag.trim();

				Tag existTag = tagRepository.findByName(tag);

				if (existTag == null) {
					Tag newTag = new Tag();
					newTag.setName(tag);
					tagRepository.save(newTag);
				}
			}
		}
	}

}
