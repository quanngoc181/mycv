package com.hust.mycv.service;

import com.hust.mycv.dto.ReceiverInfoDto;
import com.hust.mycv.dto.UserInfoDto;

public interface InfoService {
	
	public void changeAvatar(String username, String filename);
	
	public UserInfoDto findByUsername(String username);
	
	public ReceiverInfoDto findReceiverByUsername(String current, String username);
	
	public UserInfoDto updateByUsername(String username, UserInfoDto dto);

}
