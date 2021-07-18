package com.hust.mycv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hust.mycv.entity.Info;

public interface InfoRepository extends JpaRepository<Info, Integer> {
	List<Info> findByUsername(String username);

	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.skills s where u.username = :username")
	List<Info> fetchSkillsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.scholarships s where u.username = :username")
	List<Info> fetchScholarshipsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.awards s where u.username = :username")
	List<Info> fetchAwardsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.certificates s where u.username = :username")
	List<Info> fetchCertificatesByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.memberships s where u.username = :username")
	List<Info> fetchMembershipsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.theses s where u.username = :username")
	List<Info> fetchThesesByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.presentations s where u.username = :username")
	List<Info> fetchPresentationsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.books s where u.username = :username")
	List<Info> fetchBooksByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.journals s where u.username = :username")
	List<Info> fetchJournalsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.educations s where u.username = :username")
	List<Info> fetchEducationsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.works s where u.username = :username")
	List<Info> fetchWorksByUsername(String username);
	
	@Query(value = "select DISTINCT u from Info u LEFT JOIN FETCH u.projects s where u.username = :username")
	List<Info> fetchProjectsByUsername(String username);
}
