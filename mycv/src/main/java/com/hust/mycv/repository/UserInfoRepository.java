package com.hust.mycv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hust.mycv.entity.UserInfo;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {
	List<UserInfo> findByUsername(String username);

	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.skills s where u.username = :username")
	List<UserInfo> fetchSkillsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.scholarships s where u.username = :username")
	List<UserInfo> fetchScholarshipsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.awards s where u.username = :username")
	List<UserInfo> fetchAwardsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.certificates s where u.username = :username")
	List<UserInfo> fetchCertificatesByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.memberships s where u.username = :username")
	List<UserInfo> fetchMembershipsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.theses s where u.username = :username")
	List<UserInfo> fetchThesesByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.presentations s where u.username = :username")
	List<UserInfo> fetchPresentationsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.books s where u.username = :username")
	List<UserInfo> fetchBooksByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.journals s where u.username = :username")
	List<UserInfo> fetchJournalsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.educations s where u.username = :username")
	List<UserInfo> fetchEducationsByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.works s where u.username = :username")
	List<UserInfo> fetchWorksByUsername(String username);
	
	@Query(value = "select u from UserInfo u LEFT JOIN FETCH u.projects s where u.username = :username")
	List<UserInfo> fetchProjectsByUsername(String username);
}
