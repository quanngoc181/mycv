package com.hust.mycv.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.Field;
import com.hust.mycv.repository.FieldRepository;

@Service
public class FieldService {
	
	@Autowired
	FieldRepository fieldRepository;
	
	public FieldService() {
		super();
	}
	
	public void updateField(Cv cv) {
		List<String> fields = cv.getEducations().stream().map(e -> e.getField()).collect(Collectors.toList());
		
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
