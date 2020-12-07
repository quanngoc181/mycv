package com.hust.mycv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hust.mycv.entity.CvInfo;

public interface CvInfoRepository extends JpaRepository<CvInfo, Integer> {
	List<CvInfo> findByUsername(String username);

	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.skills s where u.username = :username")
	List<CvInfo> fetchSkillsByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.scholarships s where u.username = :username")
	List<CvInfo> fetchScholarshipsByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.awards s where u.username = :username")
	List<CvInfo> fetchAwardsByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.certificates s where u.username = :username")
	List<CvInfo> fetchCertificatesByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.memberships s where u.username = :username")
	List<CvInfo> fetchMembershipsByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.theses s where u.username = :username")
	List<CvInfo> fetchThesesByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.educations s where u.username = :username")
	List<CvInfo> fetchEducationsByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.works s where u.username = :username")
	List<CvInfo> fetchWorksByUsername(String username);
	
	@Query(value = "select u from CvInfo u LEFT JOIN FETCH u.projects s where u.username = :username")
	List<CvInfo> fetchProjectsByUsername(String username);
}
