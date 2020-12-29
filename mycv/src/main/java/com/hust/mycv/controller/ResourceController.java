package com.hust.mycv.controller;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.service.ResourceService;

@RestController
public class ResourceController {

	@Autowired
	ResourceService resourceService;

	@GetMapping(value = "/resources/avatar/{filename}")
	public ResponseEntity<Resource> serveAvatar(@PathVariable String filename) {

		Resource resource = resourceService.readImage("uploads/avatar", filename);

		if (resource == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài nguyên");

		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(resource);

	}

	@GetMapping(value = "/resources/cv/{filename}")
	public ResponseEntity<Resource> serveCvImage(@PathVariable String filename) {

		Resource resource = resourceService.readImage("uploads/cv", filename);

		if (resource == null)
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy tài nguyên");

		return ResponseEntity.ok().contentType(MediaType.IMAGE_PNG).body(resource);

	}
	
	@PostMapping(value = "/resources/cv")
	public String uploadCvImage(@RequestParam("file") MultipartFile file) {
		
		String filename = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) + "_" + file.getOriginalFilename();
		
		resourceService.writeImage(file, "uploads/cv", filename);
		
		return filename;

	}

}
