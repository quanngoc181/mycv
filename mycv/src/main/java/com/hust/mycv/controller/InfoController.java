package com.hust.mycv.controller;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hust.mycv.dto.ReceiverInfoDto;
import com.hust.mycv.dto.UserInfoDto;
import com.hust.mycv.service.InfoService;
import com.hust.mycv.service.ResourceService;
import com.hust.mycv.utility.StringUtility;

@RestController
public class InfoController {

	@Autowired
	InfoService infoService;

	@Autowired
	ResourceService resourceService;

	@GetMapping("/users/current/info")
	public UserInfoDto getInfo(Authentication auth) {

		String username = StringUtility.getUserName(auth.getName());

		UserInfoDto dto = infoService.findByUsername(username);

		return dto;

	}

	@PutMapping("/users/current/info")
	public UserInfoDto updateInfo(Authentication auth, @RequestBody UserInfoDto dto) {

		String username = StringUtility.getUserName(auth.getName());

		UserInfoDto ret = infoService.updateByUsername(username, dto);

		return ret;

	}

	@PostMapping("/users/change-avatar")
	public String updateAvatar(Authentication auth, @RequestParam("file") MultipartFile file) {
		
		String filename = LocalDateTime.now().toEpochSecond(ZoneOffset.UTC) + "_" + file.getOriginalFilename();

		resourceService.writeImage(file, "uploads/avatar", filename);
		resourceService.writeImage(file, "uploads/cv", filename);

		String username = StringUtility.getUserName(auth.getName());

		infoService.changeAvatar(username, filename);

		return filename;

	}

	@GetMapping("/users/{username}/info")
	public ReceiverInfoDto getReceiver(Authentication auth, @PathVariable String username) {

		String current = StringUtility.getUserName(auth.getName());

		ReceiverInfoDto dto = infoService.findReceiverByUsername(current, username);

		return dto;

	}

}
