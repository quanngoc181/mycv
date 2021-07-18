package com.hust.mycv.service;

import java.util.List;

public interface ElasticService {
	
	List<String> suggestField(String field, String keyword);
	
	List<Integer> searchCv(String keyword);

}
