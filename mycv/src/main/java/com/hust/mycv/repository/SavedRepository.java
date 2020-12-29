package com.hust.mycv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.SavedCv;

public interface SavedRepository extends JpaRepository<SavedCv, Integer> {
	
	SavedCv findByUsernameAndCvId(String username, Integer cvId);
	
	List<SavedCv> findByUsername(String username);
	
}
