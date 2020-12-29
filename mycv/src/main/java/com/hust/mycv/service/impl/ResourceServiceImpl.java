package com.hust.mycv.service.impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.service.ResourceService;

@Service
public class ResourceServiceImpl implements ResourceService {

	@Override
	public Resource readImage(String path, String filename) {
		try {
			Path file = Paths.get(path).resolve(filename);
			Resource resource = new UrlResource(file.toUri());

			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				return null;
			}
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public String writeImage(MultipartFile file, String path, String filename) {
		try {
			Path p = Paths.get(path);

			Files.copy(file.getInputStream(), p.resolve(filename), StandardCopyOption.REPLACE_EXISTING);

			return filename;
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Không thể đổi avatar.");
		}
	}

}
