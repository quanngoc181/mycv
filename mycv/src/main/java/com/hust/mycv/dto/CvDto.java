package com.hust.mycv.dto;

import java.util.List;

public class CvDto {
	
	public Integer id;

	public String cvName;

	public boolean cvPublic;

	public String cvNote;

	public String lastModified;

	public String identifier;

	public String template;

	public String citation;

	public String language;

	public String fontFamily;

	public Integer fontSize;

	public Float lineHeight;
	
	public Integer viewCount;

	public Integer downloadCount;
	
	public List<String> tags;

	public List<List<CvSectionDto>> orders;

	public List<CvSectionDto> subs;

	public String fullName;

	public String email;

	public String avatar;

	public String position;

	public String profile;

	public String gender;

	public String address;

	public String marital;

	public String childs;

	public String nationality;

	public String religion;

	public String dob;

	public String phone;

	public String additional;
	
	public String socials;
	
	public List<String> activities;
	
	public List<String> hobbies;

	public List<String> books;

	public List<String> journals;
	
	public List<String> presentations;

	public List<SkillDto> skills;

	public List<ScholarshipDto> scholarships;

	public List<AwardDto> awards;

	public List<CertificateDto> certificates;

	public List<MembershipDto> memberships;

	public List<ThesisDto> theses;

	public List<EducationDto> educations;

	public List<WorkDto> works;

	public List<ProjectDto> projects;
	
	public CvDto() {
		super();
	}

	public CvDto(Integer id, String cvName, boolean cvPublic, List<String> tags, String cvNote, String lastModified, String identifier, String template, String citation, String language, String fontFamily, Integer fontSize, Float lineHeight, List<List<CvSectionDto>> orders, List<CvSectionDto> subs, Integer viewCount, Integer downloadCount, String fullName, String email, String avatar, String position, String profile, String gender, String address, String marital, String childs, String nationality, String religion, String dob, String phone, String additional, String socials, List<String> activities, List<String> hobbies, List<String> books, List<String> journals, List<String> presentations, List<SkillDto> skills, List<ScholarshipDto> scholarships, List<AwardDto> awards, List<CertificateDto> certificates, List<MembershipDto> memberships, List<ThesisDto> theses, List<EducationDto> educations, List<WorkDto> works, List<ProjectDto> projects) {
		super();
		this.id = id;
		this.cvName = cvName;
		this.cvPublic = cvPublic;
		this.tags = tags;
		this.cvNote = cvNote;
		this.lastModified = lastModified;
		this.identifier = identifier;
		this.template = template;
		this.citation = citation;
		this.language = language;
		this.fontFamily = fontFamily;
		this.fontSize = fontSize;
		this.lineHeight = lineHeight;
		this.orders = orders;
		this.subs = subs;
		this.viewCount = viewCount;
		this.downloadCount = downloadCount;
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
		this.books = books;
		this.journals = journals;
		this.presentations = presentations;
		this.skills = skills;
		this.scholarships = scholarships;
		this.awards = awards;
		this.certificates = certificates;
		this.memberships = memberships;
		this.theses = theses;
		this.educations = educations;
		this.works = works;
		this.projects = projects;
	}
	
	public String toString() {
		String string = "";

		string += fullName + " " + position + " " + profile + " " + address + " " + nationality + " "
				+ religion + " " + additional;
		
		for (String tag : tags) {
			string += " " + tag;
		}
		
		for (String activity : activities) {
			string += " " + activity;
		}
		
		for (String hobby : hobbies) {
			string += " " + hobby;
		}
		
		for (String book : books) {
			string += " " + book;
		}
		
		for (String journal : journals) {
			string += " " + journal;
		}
		
		for (String presentation : presentations) {
			string += " " + presentation;
		}
		
		for (SkillDto skill : skills) {
			string += " " + skill.name;
		}

		for (AwardDto award : awards) {
			string += " " + award.name + " " + award.organization;
		}

		for (CertificateDto certificate : certificates) {
			string += " " + certificate.name + " " + certificate.organization;
		}

		for (ScholarshipDto scholarship : scholarships) {
			string += " " + scholarship.name + " " + scholarship.organization;
		}

		for (MembershipDto membership : memberships) {
			string += " " + membership.role + " " + membership.organization;
		}

		for (ThesisDto thesis : theses) {
			string += " " + thesis.title + " " + thesis.advisor + " " + thesis.description;
		}

		for (EducationDto education : educations) {
			string += " " + education.school + " " + education.field + " " + education.description;
		}

		for (WorkDto work : works) {
			string += " " + work.company + " " + work.position + " " + work.description;
		}

		for (ProjectDto project : projects) {
			string += " " + project.name + " " + project.company + " " + project.description;
		}
		
		string = string.replaceAll("\"", "");

		return string;
	}

}
