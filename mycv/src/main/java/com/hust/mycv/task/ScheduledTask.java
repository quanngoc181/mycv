package com.hust.mycv.task;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.hust.mycv.entity.Address;
import com.hust.mycv.entity.Company;
import com.hust.mycv.entity.Field;
import com.hust.mycv.entity.Position;
import com.hust.mycv.entity.School;
import com.hust.mycv.entity.SkillType;
import com.hust.mycv.entity.Tag;
import com.hust.mycv.repository.AddressRepository;
import com.hust.mycv.repository.CompanyRepository;
import com.hust.mycv.repository.FieldRepository;
import com.hust.mycv.repository.PositionRepository;
import com.hust.mycv.repository.SchoolRepository;
import com.hust.mycv.repository.SkillTypeRepository;
import com.hust.mycv.repository.TagRepository;

@Component
public class ScheduledTask {

	@Autowired
	RestTemplate restTemplate;

	@Autowired
	TagRepository tagRepository;
	
	@Autowired
	SchoolRepository schoolRepository;
	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	FieldRepository fieldRepository;
	
	@Autowired
	PositionRepository positionRepository;
	
	@Autowired
	SkillTypeRepository skillTypeRepository;
	
	@Autowired
	AddressRepository addressRepository;

	@Scheduled(fixedRate = 60000 * 5)
	public void syncDataElasticSearch() {
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/tag/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

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

			restTemplate.exchange(request, String.class);

			System.out.println("add tag done");
		} catch (Exception e) {
			System.out.println(e);
		}
		
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/school/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("delete school done");
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			String body = "";

			List<School> schools = schoolRepository.findAll();

			for (School school : schools) {
				body += String.format("{\"index\":{\"_id\":\"%s\"}}\n", school.getId());
				body += String.format("{\"name\":\"%s\"}\n", school.getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/school/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("add school done");
		} catch (Exception e) {
			System.out.println(e);
		}
		
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/company/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("delete company done");
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			String body = "";

			List<Company> companies = companyRepository.findAll();

			for (Company company : companies) {
				body += String.format("{\"index\":{\"_id\":\"%s\"}}\n", company.getId());
				body += String.format("{\"name\":\"%s\"}\n", company.getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/company/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("add company done");
		} catch (Exception e) {
			System.out.println(e);
		}
		
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/field/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("delete field done");
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			String body = "";

			List<Field> fields = fieldRepository.findAll();

			for (Field field : fields) {
				body += String.format("{\"index\":{\"_id\":\"%s\"}}\n", field.getId());
				body += String.format("{\"name\":\"%s\"}\n", field.getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/field/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("add field done");
		} catch (Exception e) {
			System.out.println(e);
		}
		
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/position/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("delete position done");
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			String body = "";

			List<Position> positions = positionRepository.findAll();

			for (Position position : positions) {
				body += String.format("{\"index\":{\"_id\":\"%s\"}}\n", position.getId());
				body += String.format("{\"name\":\"%s\"}\n", position.getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/position/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("add position done");
		} catch (Exception e) {
			System.out.println(e);
		}
		
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/skill/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("delete skill done");
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			String body = "";

			List<SkillType> skills = skillTypeRepository.findAll();

			for (SkillType skill : skills) {
				body += String.format("{\"index\":{\"_id\":\"%s\"}}\n", skill.getId());
				body += String.format("{\"name\":\"%s\"}\n", skill.getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/skill/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("add skill done");
		} catch (Exception e) {
			System.out.println(e);
		}

		
		try {
			String body = "{\"query\":{\"match_all\":{}}}";

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/address/_delete_by_query")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("delete address done");
		} catch (Exception e) {
			System.out.println(e);
		}

		try {
			String body = "";

			List<Address> addresses = addressRepository.findAll();

			for (Address address : addresses) {
				body += String.format("{\"index\":{\"_id\":\"%s\"}}\n", address.getId());
				body += String.format("{\"name\":\"%s\"}\n", address.getName());
			}

			RequestEntity<String> request = RequestEntity.post(new URI("http://localhost:9200/address/_bulk")).contentType(MediaType.APPLICATION_JSON).body(body);

			restTemplate.exchange(request, String.class);

			System.out.println("add address done");
		} catch (Exception e) {
			System.out.println(e);
		}
	}

}
