package com.hust.mycv.mapper;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.hust.mycv.dto.AwardDto;
import com.hust.mycv.dto.CertificateDto;
import com.hust.mycv.dto.CvDto;
import com.hust.mycv.dto.EducationDto;
import com.hust.mycv.dto.MembershipDto;
import com.hust.mycv.dto.ProjectDto;
import com.hust.mycv.dto.ScholarshipDto;
import com.hust.mycv.dto.SkillDto;
import com.hust.mycv.dto.ThesisDto;
import com.hust.mycv.dto.WorkDto;
import com.hust.mycv.entity.Award;
import com.hust.mycv.entity.Certificate;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.Education;
import com.hust.mycv.entity.Membership;
import com.hust.mycv.entity.Project;
import com.hust.mycv.entity.Scholarship;
import com.hust.mycv.entity.Skill;
import com.hust.mycv.entity.Thesis;
import com.hust.mycv.entity.Work;
import com.hust.mycv.utility.StringUtility;

public class CvMapper {

	public static CvDto cvToCvDto(Cv cv) {

		CvDto dto = new CvDto();

		dto.id = cv.getId();
		dto.sender = cv.getSender();
		dto.cvName = cv.getCvName();
		dto.cvPublic = cv.isCvPublic();
		dto.cvNote = cv.getCvNote();
		dto.lastModified = cv.getLastModified().format(DateTimeFormatter.ofPattern("HH:mm:ss dd/MM/yyyy"));
		dto.identifier = cv.getIdentifier();
		dto.template = cv.getTemplate();
		dto.citation = cv.getCitation();
		dto.language = cv.getLanguage();
		dto.fontFamily = cv.getFontFamily();
		dto.fontSize = cv.getFontSize();
		dto.lineHeight = cv.getLineHeight();
		dto.viewCount = cv.getViewCount();
		dto.downloadCount = cv.getDownloadCount();

		dto.tags = StringUtility.jsonToList(cv.getTags());
		dto.orders = StringUtility.jsonToList2dSection(cv.getOrders());
		dto.subs = StringUtility.jsonToListSection(cv.getSubs());

		dto.fullName = cv.getFullName();
		dto.email = cv.getEmail();
		dto.avatar = cv.getAvatar() == null ? "default-avatar.png" : cv.getAvatar();
		dto.position = cv.getPosition();
		dto.profile = cv.getProfile();
		dto.gender = cv.getGender();
		dto.address = cv.getAddress();
		dto.marital = cv.getMarital();
		dto.childs = cv.getChilds();
		dto.nationality = cv.getNationality();
		dto.religion = cv.getReligion();
		dto.dob = cv.getDob();
		dto.phone = cv.getPhone();
		dto.additional = cv.getAdditional();
		dto.socials = cv.getSocials();

		dto.activities = StringUtility.jsonToList(cv.getActivities());
		dto.hobbies = StringUtility.jsonToList(cv.getHobbies());
		dto.books = StringUtility.jsonToList(cv.getBooks());
		dto.journals = StringUtility.jsonToList(cv.getJournals());
		dto.presentations = StringUtility.jsonToList(cv.getPresentations());

		List<SkillDto> skills = new ArrayList<>();
		for (Skill skill : cv.getSkills()) {
			skills.add(new SkillDto(skill.getName(), skill.getRate()));
		}
		dto.skills = skills;

		List<ScholarshipDto> scholarships = new ArrayList<>();
		for (Scholarship scholarship : cv.getScholarships()) {
			scholarships.add(new ScholarshipDto(scholarship.getName(), scholarship.getOrganization(), scholarship.getYear()));
		}
		dto.scholarships = scholarships;

		List<AwardDto> awards = new ArrayList<>();
		for (Award award : cv.getAwards()) {
			awards.add(new AwardDto(award.getName(), award.getOrganization(), award.getYear()));
		}
		dto.awards = awards;

		List<CertificateDto> certificates = new ArrayList<>();
		for (Certificate certificate : cv.getCertificates()) {
			certificates.add(new CertificateDto(certificate.getName(), certificate.getOrganization(), certificate.getYear()));
		}
		dto.certificates = certificates;

		List<MembershipDto> memberships = new ArrayList<>();
		for (Membership membership : cv.getMemberships()) {
			memberships.add(new MembershipDto(membership.getRole(), membership.getOrganization(), membership.getStart(), membership.getEnd()));
		}
		dto.memberships = memberships;

		List<ThesisDto> theses = new ArrayList<>();
		for (Thesis thesis : cv.getTheses()) {
			theses.add(new ThesisDto(thesis.getTitle(), thesis.getAdvisor(), thesis.getDescription()));
		}
		dto.theses = theses;

		List<EducationDto> educations = new ArrayList<>();
		for (Education education : cv.getEducations()) {
			educations.add(new EducationDto(education.getSchool(), education.getField(), education.getStart(), education.getEnd(), education.getDescription()));
		}
		dto.educations = educations;

		List<WorkDto> works = new ArrayList<>();
		for (Work work : cv.getWorks()) {
			works.add(new WorkDto(work.getCompany(), work.getPosition(), work.getStart(), work.getEnd(), work.getDescription()));
		}
		dto.works = works;

		List<ProjectDto> projects = new ArrayList<>();
		for (Project project : cv.getProjects()) {
			projects.add(new ProjectDto(project.getCompany(), project.getName(), project.getStart(), project.getEnd(), project.getDescription()));
		}
		dto.projects = projects;

		return dto;

	}

	public static Cv cvDtoToCv(CvDto dto) {

		Cv cv = new Cv();

		cv.setId(dto.id);
		cv.setCvName(dto.cvName);
		cv.setCvPublic(dto.cvPublic);
		cv.setCvNote(dto.cvNote);
		cv.setLastModified(dto.lastModified == null ? null
				: LocalDateTime.parse(dto.lastModified, DateTimeFormatter.ofPattern("HH:mm:ss dd/MM/yyyy")));
		cv.setIdentifier(dto.identifier);
		cv.setTemplate(dto.template);
		cv.setCitation(dto.citation);
		cv.setLanguage(dto.language);
		cv.setFontFamily(dto.fontFamily);
		cv.setFontSize(dto.fontSize);
		cv.setLineHeight(dto.lineHeight);
		cv.setViewCount(dto.viewCount);
		cv.setDownloadCount(dto.downloadCount);

		cv.setTags(StringUtility.listToJson(dto.tags));
		cv.setOrders(StringUtility.list2dSectionToJson(dto.orders));
		cv.setSubs(StringUtility.listSectionToJson(dto.subs));

		cv.setFullName(dto.fullName);
		cv.setEmail(dto.email);
		cv.setAvatar(dto.avatar);
		cv.setPosition(dto.position);
		cv.setProfile(dto.profile);
		cv.setGender(dto.gender);
		cv.setAddress(dto.address);
		cv.setMarital(dto.marital);
		cv.setChilds(dto.childs);
		cv.setNationality(dto.nationality);
		cv.setReligion(dto.religion);
		cv.setDob(dto.dob);
		cv.setPhone(dto.phone);
		cv.setAdditional(dto.additional);
		cv.setSocials(dto.socials);

		cv.setActivities(StringUtility.listToJson(dto.activities));
		cv.setHobbies(StringUtility.listToJson(dto.hobbies));
		cv.setBooks(StringUtility.listToJson(dto.books));
		cv.setJournals(StringUtility.listToJson(dto.journals));
		cv.setPresentations(StringUtility.listToJson(dto.presentations));

		List<Skill> skills = new ArrayList<>();
		for (SkillDto skill : dto.skills) {
			skills.add(new Skill(null, skill.name, skill.rate));
		}
		cv.setSkills(skills);

		List<Scholarship> scholarships = new ArrayList<>();
		for (ScholarshipDto scholarship : dto.scholarships) {
			scholarships.add(new Scholarship(null, scholarship.name, scholarship.organization, scholarship.year));
		}
		cv.setScholarships(scholarships);

		List<Award> awards = new ArrayList<>();
		for (AwardDto award : dto.awards) {
			awards.add(new Award(null, award.name, award.organization, award.year));
		}
		cv.setAwards(awards);

		List<Certificate> certificates = new ArrayList<>();
		for (CertificateDto certificate : dto.certificates) {
			certificates.add(new Certificate(null, certificate.name, certificate.organization, certificate.year));
		}
		cv.setCertificates(certificates);

		List<Membership> memberships = new ArrayList<>();
		for (MembershipDto membership : dto.memberships) {
			memberships.add(new Membership(null, membership.role, membership.organization, membership.start, membership.end));
		}
		cv.setMemberships(memberships);

		List<Thesis> theses = new ArrayList<>();
		for (ThesisDto thesis : dto.theses) {
			theses.add(new Thesis(null, thesis.title, thesis.advisor, thesis.description));
		}
		cv.setTheses(theses);

		List<Education> educations = new ArrayList<>();
		for (EducationDto education : dto.educations) {
			educations.add(new Education(null, education.school, education.field, education.start, education.end, education.description));
		}
		cv.setEducations(educations);

		List<Work> works = new ArrayList<>();
		for (WorkDto work : dto.works) {
			works.add(new Work(null, work.company, work.position, work.start, work.end, work.description));
		}
		cv.setWorks(works);

		List<Project> projects = new ArrayList<>();
		for (ProjectDto project : dto.projects) {
			projects.add(new Project(null, project.company, project.name, project.start, project.end, project.description));
		}
		cv.setProjects(projects);

		return cv;

	}

}
