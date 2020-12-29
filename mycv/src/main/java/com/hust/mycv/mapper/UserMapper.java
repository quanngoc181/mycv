package com.hust.mycv.mapper;

import com.hust.mycv.dto.UserDto;
import com.hust.mycv.entity.AppUser;

public class UserMapper {
	
	public static UserDto appUserToUserDto(AppUser appUser) {
		
		UserDto dto = new UserDto();
		
		dto.username = appUser.getUsername();
		dto.role = appUser.getRole();
		
		return dto;
		
	}

}
