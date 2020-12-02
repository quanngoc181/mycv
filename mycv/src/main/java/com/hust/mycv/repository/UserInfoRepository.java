package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hust.mycv.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
	UserInfo findByUsername(String username);

	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.skills s where u.username = :username")
	UserInfo fetchSkillsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.scholarships s where u.username = :username")
	UserInfo fetchScholarshipsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.awards s where u.username = :username")
	UserInfo fetchAwardsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.certificates s where u.username = :username")
	UserInfo fetchCertificatesByUsername(String username);
}
