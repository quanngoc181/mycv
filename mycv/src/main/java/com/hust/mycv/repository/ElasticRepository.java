package com.hust.mycv.repository;

import java.util.List;

import com.hust.mycv.entity.ElasticResponse;
import com.hust.mycv.entity.HitsElement;

public interface ElasticRepository {

	void bulkDelete(String index, List<HitsElement> elements);
	
	void buldAdd(String index, List<HitsElement> elements);
	
	ElasticResponse search(String index, String keyword, String fuziness);

}
