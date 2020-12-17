package com.hust.mycv.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class CvInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String cvName;
	
	private boolean cvPublic;
	
	private String tags;

	private String cvNote;

	private LocalDateTime lastModified;

	private String identifier;

	private String template;

	private String citation;

	private String language;

	private String fontFamily;

	private Integer fontSize;

	private Float lineHeight;

	@Column(columnDefinition = "TEXT")
	private String orders;
	
	private Integer viewCount;
	
	private Integer downloadCount;

	private String username;

	private String fullName;

	private String email;

	private String avatar;

	private String position;

	private String profile;

	private String gender;

	private String address;

	private String marital;

	private String childs;

	private String nationality;

	private String religion;

	private String dob;

	private String phone;

	private String additional;

	private String socials;

	private String activities;

	private String hobbies;

	private String books;

	private String journals;

	private String presentations;

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Award> awards = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Certificate> certificates = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Scholarship> scholarships = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Skill> skills = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Thesis> theses = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Education> educations = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Work> works = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Project> projects = new ArrayList<>();

	@OneToMany(mappedBy = "cvInfo", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
	private List<Membership> memberships = new ArrayList<>();

	public CvInfo() {
		super();
	}

	public CvInfo(Integer id, String cvName, boolean cvPublic, String tags, String cvNote, LocalDateTime lastModified, String identifier, String template, String citation, String language, String fontFamily, Integer fontSize, Float lineHeight, String orders, Integer viewCount, Integer downloadCount, String username, String fullName, String email, String avatar, String position, String profile, String gender, String address, String marital, String childs, String nationality, String religion, String dob, String phone, String additional, String socials, String activities, String hobbies, String books, String journals, String presentations) {
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
		this.viewCount = viewCount;
		this.downloadCount = downloadCount;
		this.username = username;
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
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCvName() {
		return cvName;
	}

	public void setCvName(String cvName) {
		this.cvName = cvName;
	}

	public boolean isCvPublic() {
		return cvPublic;
	}

	public void setCvPublic(boolean cvPublic) {
		this.cvPublic = cvPublic;
	}

	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	public String getCvNote() {
		return cvNote;
	}

	public void setCvNote(String cvNote) {
		this.cvNote = cvNote;
	}

	public LocalDateTime getLastModified() {
		return lastModified;
	}

	public void setLastModified(LocalDateTime lastModified) {
		this.lastModified = lastModified;
	}

	public String getIdentifier() {
		return identifier;
	}

	public void setIdentifier(String identifier) {
		this.identifier = identifier;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public String getCitation() {
		return citation;
	}

	public void setCitation(String citation) {
		this.citation = citation;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public String getFontFamily() {
		return fontFamily;
	}

	public void setFontFamily(String fontFamily) {
		this.fontFamily = fontFamily;
	}

	public Integer getFontSize() {
		return fontSize;
	}

	public void setFontSize(Integer fontSize) {
		this.fontSize = fontSize;
	}

	public Float getLineHeight() {
		return lineHeight;
	}

	public void setLineHeight(Float lineHeight) {
		this.lineHeight = lineHeight;
	}

	public String getOrders() {
		return orders;
	}

	public void setOrders(String orders) {
		this.orders = orders;
	}

	public Integer getViewCount() {
		return viewCount;
	}

	public void setViewCount(Integer viewCount) {
		this.viewCount = viewCount;
	}

	public Integer getDownloadCount() {
		return downloadCount;
	}

	public void setDownloadCount(Integer downloadCount) {
		this.downloadCount = downloadCount;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getMarital() {
		return marital;
	}

	public void setMarital(String marital) {
		this.marital = marital;
	}

	public String getChilds() {
		return childs;
	}

	public void setChilds(String childs) {
		this.childs = childs;
	}

	public String getNationality() {
		return nationality;
	}

	public void setNationality(String nationality) {
		this.nationality = nationality;
	}

	public String getReligion() {
		return religion;
	}

	public void setReligion(String religion) {
		this.religion = religion;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAdditional() {
		return additional;
	}

	public void setAdditional(String additional) {
		this.additional = additional;
	}

	public String getSocials() {
		return socials;
	}

	public void setSocials(String socials) {
		this.socials = socials;
	}

	public String getActivities() {
		return activities;
	}

	public void setActivities(String activities) {
		this.activities = activities;
	}

	public String getHobbies() {
		return hobbies;
	}

	public void setHobbies(String hobbies) {
		this.hobbies = hobbies;
	}

	public String getBooks() {
		return books;
	}

	public void setBooks(String books) {
		this.books = books;
	}

	public String getJournals() {
		return journals;
	}

	public void setJournals(String journals) {
		this.journals = journals;
	}

	public String getPresentations() {
		return presentations;
	}

	public void setPresentations(String presentations) {
		this.presentations = presentations;
	}

	public List<Award> getAwards() {
		return awards;
	}

	public void setAwards(List<Award> awards) {
		this.awards = awards;
		for (Award award : awards) {
			award.setCvInfo(this);
		}
	}

	public List<Certificate> getCertificates() {
		return certificates;
	}

	public void setCertificates(List<Certificate> certificates) {
		this.certificates = certificates;
		for (Certificate certificate : certificates) {
			certificate.setCvInfo(this);
		}
	}

	public List<Scholarship> getScholarships() {
		return scholarships;
	}

	public void setScholarships(List<Scholarship> scholarships) {
		this.scholarships = scholarships;
		for (Scholarship scholarship : scholarships) {
			scholarship.setCvInfo(this);
		}
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
		for (Skill skill : skills) {
			skill.setCvInfo(this);
		}
	}

	public List<Thesis> getTheses() {
		return theses;
	}

	public void setTheses(List<Thesis> theses) {
		this.theses = theses;
		for (Thesis thesis : theses) {
			thesis.setCvInfo(this);
		}
	}

	public List<Education> getEducations() {
		return educations;
	}

	public void setEducations(List<Education> educations) {
		this.educations = educations;
		for (Education education : educations) {
			education.setCvInfo(this);
		}
	}

	public List<Work> getWorks() {
		return works;
	}

	public void setWorks(List<Work> works) {
		this.works = works;
		for (Work work : works) {
			work.setCvInfo(this);
		}
	}

	public List<Project> getProjects() {
		return projects;
	}

	public void setProjects(List<Project> projects) {
		this.projects = projects;
		for (Project project : projects) {
			project.setCvInfo(this);
		}
	}

	public List<Membership> getMemberships() {
		return memberships;
	}

	public void setMemberships(List<Membership> memberships) {
		this.memberships = memberships;
		for (Membership membership : memberships) {
			membership.setCvInfo(this);
		}
	}

}
