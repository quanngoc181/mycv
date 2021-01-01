package com.hust.mycv.repository;

import java.util.List;

import com.hust.mycv.entity.ElasticResponse;
import com.hust.mycv.entity.HitsElement;

public interface ElasticRepository {

	void deleteAll(String index);
	
	void buldAdd(String index, List<HitsElement> elements);
	
	ElasticResponse search(String index, String keyword, String fuziness);

}
