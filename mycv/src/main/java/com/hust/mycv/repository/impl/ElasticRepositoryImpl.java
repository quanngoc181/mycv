package com.hust.mycv.repository.impl;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.hust.mycv.entity.ElasticResponse;
import com.hust.mycv.entity.HitsElement;
import com.hust.mycv.repository.ElasticRepository;

@Repository
public class ElasticRepositoryImpl implements ElasticRepository {

	@Autowired
	RestTemplate restTemplate;

	@Override
	public void bulkDelete(String index, List<HitsElement> elements) {
		
		try {
			String body = "";

			for (HitsElement element : elements) {
				body += String.format("{\"delete\":{\"_id\":\"%s\"}}\n", element.get_id());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/" + index
					+ "/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("delete " + index + " done");
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public void buldAdd(String index, List<HitsElement> elements) {

		try {
			String body = "";

			for (HitsElement element : elements) {
				body += String.format("{\"create\":{\"_id\":\"%s\"}}\n", element.get_id());
				body += String.format("{\"name\":\"%s\"}\n", element.get_source().getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/" + index
					+ "/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("add " + index + " done");
		} catch (Exception e) {
			System.out.println(e);
		}

	}

	@Override
	public ElasticResponse search(String index, String keyword, String fuziness) {

		try {
			String body = "{\n"
					+ "  \"query\": {\n"
					+ "    \"match\": {\n"
					+ "      \"name\": {\n"
					+ "        \"query\": \"" + keyword + "\",\n"
					+ "        \"fuzziness\": \"" + fuziness + "\"\n"
					+ "      }\n"
					+ "    }\n"
					+ "  },\n"
					+ "  \"size\": 10000\n"
					+ "}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/" + index
					+ "/_search")).contentType(MediaType.APPLICATION_JSON).body(body);

			ResponseEntity<ElasticResponse> response = restTemplate.exchange(request, ElasticResponse.class);

			ElasticResponse er = response.getBody();

			return er;
		} catch (Exception e) {
			System.out.println(e);
		}

		return null;

	}

}
