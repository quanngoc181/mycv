package com.hust.mycv.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hust.mycv.entity.ApplicationUser;
import com.hust.mycv.repository.UserRepository;

@Service
public class UserDetailService implements UserDetailsService {

	private UserRepository userRepository;

	public UserDetailService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		ApplicationUser appUser = userRepository.findByUsername(username);
		if (appUser == null || !appUser.isEnabled()) {
			throw new UsernameNotFoundException(username);
		}
		
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
        roles.add(new SimpleGrantedAuthority(appUser.getRole()));
		
		User user = new User(appUser.getUsername(), appUser.getPassword(), roles);
		
		return user;
	}
}
