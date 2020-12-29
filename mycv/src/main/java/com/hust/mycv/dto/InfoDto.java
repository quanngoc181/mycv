package com.hust.mycv.dto;

import java.util.List;

public class InfoDto {
	
	public String fullName;
	
	public String email;
	
	public String avatar;
	
	public String position;
	
	public String profile;
	
	public String gender;
	
	public String address;
	
	public String marital;
	
	public Integer childs;
	
	public String nationality;
	
	public String religion;
	
	public String dob;
	
	public String phone;
	
	public String additional;
	
	public List<String> socials;
	
	public List<String> activities;
	
	public List<String> hobbies;
	
	public List<SkillDto> skills;

	public List<ScholarshipDto> scholarships;

	public List<AwardDto> awards;

	public List<CertificateDto> certificates;

	public List<MembershipDto> memberships;

	public List<ThesisDto> theses;

	public List<PresentationDto> presentations;

	public List<BookDto> books;

	public List<JournalDto> journals;
	
	public List<EducationDto> educations;
	
	public List<WorkDto> works;
	
	public List<ProjectDto> projects;
	
	public InfoDto() {
		super();
	}

	public InfoDto(String fullName, String email, String avatar, String position, String profile, String gender, String address, String marital, Integer childs, String nationality, String religion, String dob, String phone, String additional, List<String> socials, List<String> activities, List<String> hobbies, List<SkillDto> skills, List<ScholarshipDto> scholarships, List<AwardDto> awards, List<CertificateDto> certificates, List<MembershipDto> memberships, List<ThesisDto> theses, List<PresentationDto> presentations, List<BookDto> books, List<JournalDto> journals, List<EducationDto> educations, List<WorkDto> works, List<ProjectDto> projects) {
		super();
		this.fullName = fullName;
		this.email = email;
		this.avatar = avatar;
		this.position = position;
		this.profile = profile;
		this.gender = gender;
		this.address = address;
		this.marital = marital;
		this.childs = childs;
		this.nationality = nationality;
		this.religion = religion;
		this.dob = dob;
		this.phone = phone;
		this.additional = additional;
		this.socials = socials;
		this.activities = activities;
		this.hobbies = hobbies;
		this.skills = skills;
		this.scholarships = scholarships;
		this.awards = awards;
		this.certificates = certificates;
		this.memberships = memberships;
		this.theses = theses;
		this.presentations = presentations;
		this.books = books;
		this.journals = journals;
		this.educations = educations;
		this.works = works;
		this.projects = projects;
	}

}
