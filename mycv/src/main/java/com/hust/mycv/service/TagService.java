package com.hust.mycv.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hust.mycv.entity.Tag;
import com.hust.mycv.repository.TagRepository;

@Service
public class TagService {

	@Autowired
	TagRepository tagRepository;

	public TagService() {
		super();
	}

	public void updateTag(String tagString) {
		ObjectMapper mapper = new ObjectMapper();
		try {
			String[] tags = mapper.readValue(tagString, String[].class);

			for (String tag : tags) {
				tag = tag.trim();

				Tag existTag = tagRepository.findByName(tag);

				if (existTag == null) {
					Tag newTag = new Tag();
					newTag.setName(tag);
					tagRepository.save(newTag);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
