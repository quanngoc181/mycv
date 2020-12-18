package com.hust.mycv.task;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.hust.mycv.entity.Tag;
import com.hust.mycv.repository.TagRepository;

@Component
public class ScheduledTask {

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	TagRepository tagRepository;

	@Scheduled(fixedRate = 60000 * 5)
	public void syncDataElasticSearch() {
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/tag/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, Tag.class);

			System.out.println("delete tag done");
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			String body = "";

			List<Tag> tags = tagRepository.findAll();

			for (Tag tag : tags) {
				body += String.format("{\"index\":{\"_id\":\"%s\"}}\n", tag.getId());
				body += String.format("{\"name\":\"%s\"}\n", tag.getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/tag/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, Tag.class);

			System.out.println("add tag done");
		} catch (Exception e) {
			System.out.println(e);
		}

	}

}
