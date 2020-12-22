package com.hust.mycv.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.hust.mycv.entity.Cv;

public interface CvRepository extends JpaRepository<Cv, Integer> {
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.skills s")
	List<Cv> fetchSkills();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.scholarships s")
	List<Cv> fetchScholarships();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.awards s")
	List<Cv> fetchAwards();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.certificates s")
	List<Cv> fetchCertificates();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.memberships s")
	List<Cv> fetchMemberships();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.theses s")
	List<Cv> fetchTheses();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.educations s")
	List<Cv> fetchEducations();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.works s")
	List<Cv> fetchWorks();
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.projects s")
	List<Cv> fetchProjects();
	
	List<Cv> findByUsername(String username);

	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.skills s where u.username = :username")
	List<Cv> fetchSkillsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.scholarships s where u.username = :username")
	List<Cv> fetchScholarshipsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.awards s where u.username = :username")
	List<Cv> fetchAwardsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.certificates s where u.username = :username")
	List<Cv> fetchCertificatesByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.memberships s where u.username = :username")
	List<Cv> fetchMembershipsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.theses s where u.username = :username")
	List<Cv> fetchThesesByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.educations s where u.username = :username")
	List<Cv> fetchEducationsByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.works s where u.username = :username")
	List<Cv> fetchWorksByUsername(String username);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.projects s where u.username = :username")
	List<Cv> fetchProjectsByUsername(String username);
	
	Cv findByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.skills s where u.identifier = :identifier")
	Cv fetchSkillsByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.scholarships s where u.identifier = :identifier")
	Cv fetchScholarshipsByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.awards s where u.identifier = :identifier")
	Cv fetchAwardsByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.certificates s where u.identifier = :identifier")
	Cv fetchCertificatesByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.memberships s where u.identifier = :identifier")
	Cv fetchMembershipsByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.theses s where u.identifier = :identifier")
	Cv fetchThesesByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.educations s where u.identifier = :identifier")
	Cv fetchEducationsByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.works s where u.identifier = :identifier")
	Cv fetchWorksByIdentifier(String identifier);
	
	@Query(value = "select DISTINCT u from Cv u LEFT JOIN FETCH u.projects s where u.identifier = :identifier")
	Cv fetchProjectsByIdentifier(String identifier);
}
