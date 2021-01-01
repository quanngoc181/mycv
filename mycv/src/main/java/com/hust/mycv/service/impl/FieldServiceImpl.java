package com.hust.mycv.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.Field;
import com.hust.mycv.repository.FieldRepository;
import com.hust.mycv.service.FieldService;

@Service
public class FieldServiceImpl implements FieldService {
	
	@Autowired
	FieldRepository fieldRepository;
	
	public void updateField(CvDto dto) {
		List<String> fields = dto.educations.stream().map(e -> e.field).collect(Collectors.toList());
		
		for (String field : fields) {
			if(field != null) {
				field = field.trim();
				
				Field exist = fieldRepository.findByName(field);
				
				if (exist == null) {
					Field newField = new Field();
					newField.setName(field);
					fieldRepository.save(newField);
				}
			}
		}
	}

}
