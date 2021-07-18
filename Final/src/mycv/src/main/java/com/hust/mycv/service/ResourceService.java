package com.hust.mycv.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ResourceService {

	Resource readImage(String path, String filename);
	
	String writeImage(MultipartFile file, String path, String filename);

}
