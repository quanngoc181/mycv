package com.hust.mycv.mapper;

import java.util.ArrayList;
import java.util.List;

import com.hust.mycv.dto.AwardDto;
import com.hust.mycv.dto.BookDto;
import com.hust.mycv.dto.CertificateDto;
import com.hust.mycv.dto.EducationDto;
import com.hust.mycv.dto.InfoDto;
import com.hust.mycv.dto.JournalDto;
import com.hust.mycv.dto.MembershipDto;
import com.hust.mycv.dto.PresentationDto;
import com.hust.mycv.dto.ProjectDto;
import com.hust.mycv.dto.ScholarshipDto;
import com.hust.mycv.dto.SkillDto;
import com.hust.mycv.dto.ThesisDto;
import com.hust.mycv.dto.WorkDto;
import com.hust.mycv.entity.Award;
import com.hust.mycv.entity.Book;
import com.hust.mycv.entity.Certificate;
import com.hust.mycv.entity.Education;
import com.hust.mycv.entity.Info;
import com.hust.mycv.entity.Journal;
import com.hust.mycv.entity.Membership;
import com.hust.mycv.entity.Presentation;
import com.hust.mycv.entity.Project;
import com.hust.mycv.entity.Scholarship;
import com.hust.mycv.entity.Skill;
import com.hust.mycv.entity.Thesis;
import com.hust.mycv.entity.Work;
import com.hust.mycv.utility.StringUtility;

public class InfoMapper {

	public static InfoDto infoToInfoDto(Info info) {

		InfoDto dto = new InfoDto();

		dto.fullName = info.getFullName();
		dto.email = info.getEmail();
		dto.avatar = info.getAvatar() == null ? "default-avatar.png" : info.getAvatar();
		dto.position = info.getPosition();
		dto.profile = info.getProfile();
		dto.gender = info.getGender();
		dto.address = info.getAddress();
		dto.marital = info.getMarital();
		dto.childs = info.getChilds();
		dto.nationality = info.getNationality();
		dto.religion = info.getReligion();
		dto.dob = info.getDob();
		dto.phone = info.getPhone();
		dto.additional = info.getAdditional();

		dto.socials = StringUtility.jsonToList(info.getSocials());
		dto.activities = StringUtility.jsonToList(info.getActivities());
		dto.hobbies = StringUtility.jsonToList(info.getHobbies());

		List<SkillDto> skills = new ArrayList<>();
		for (Skill skill : info.getSkills()) {
			skills.add(new SkillDto(skill.getName(), skill.getRate()));
		}
		dto.skills = skills;

		List<ScholarshipDto> scholarships = new ArrayList<>();
		for (Scholarship scholarship : info.getScholarships()) {
			scholarships.add(new ScholarshipDto(scholarship.getName(), scholarship.getOrganization(), scholarship.getYear()));
		}
		dto.scholarships = scholarships;

		List<AwardDto> awards = new ArrayList<>();
		for (Award award : info.getAwards()) {
			awards.add(new AwardDto(award.getName(), award.getOrganization(), award.getYear()));
		}
		dto.awards = awards;

		List<CertificateDto> certificates = new ArrayList<>();
		for (Certificate certificate : info.getCertificates()) {
			certificates.add(new CertificateDto(certificate.getName(), certificate.getOrganization(), certificate.getYear()));
		}
		dto.certificates = certificates;

		List<MembershipDto> memberships = new ArrayList<>();
		for (Membership membership : info.getMemberships()) {
			memberships.add(new MembershipDto(membership.getRole(), membership.getOrganization(), membership.getStart(), membership.getEnd()));
		}
		dto.memberships = memberships;

		List<ThesisDto> theses = new ArrayList<>();
		for (Thesis thesis : info.getTheses()) {
			theses.add(new ThesisDto(thesis.getTitle(), thesis.getAdvisor(), thesis.getDescription()));
		}
		dto.theses = theses;

		List<PresentationDto> presentations = new ArrayList<>();
		for (Presentation presentation : info.getPresentations()) {
			presentations.add(new PresentationDto(presentation.getTitle(), presentation.getConference(), presentation.getLocation(), presentation.getYear()));
		}
		dto.presentations = presentations;

		List<BookDto> books = new ArrayList<>();
		for (Book book : info.getBooks()) {
			books.add(new BookDto(book.getTitle(), book.getPublisher(), book.getLocation(), StringUtility.jsonToList(book.getAuthors()), book.getYear()));
		}
		dto.books = books;

		List<JournalDto> journals = new ArrayList<>();
		for (Journal journal : info.getJournals()) {
			journals.add(new JournalDto(journal.getTitle(), journal.getName(), StringUtility.jsonToList(journal.getAuthors()), journal.getYear(), journal.getVolume(), journal.getIssue(), journal.getStart(), journal.getEnd()));
		}
		dto.journals = journals;

		List<EducationDto> educations = new ArrayList<>();
		for (Education education : info.getEducations()) {
			educations.add(new EducationDto(education.getSchool(), education.getField(), education.getStart(), education.getEnd(), education.getDescription()));
		}
		dto.educations = educations;

		List<WorkDto> works = new ArrayList<>();
		for (Work work : info.getWorks()) {
			works.add(new WorkDto(work.getCompany(), work.getPosition(), work.getStart(), work.getEnd(), work.getDescription()));
		}
		dto.works = works;

		List<ProjectDto> projects = new ArrayList<>();
		for (Project project : info.getProjects()) {
			projects.add(new ProjectDto(project.getCompany(), project.getName(), project.getStart(), project.getEnd(), project.getDescription()));
		}
		dto.projects = projects;

		return dto;

	}

	public static Info infoDtoToInfo(InfoDto dto) {

		Info info = new Info();

		info.setFullName(dto.fullName);
		info.setEmail(dto.email);
		info.setAvatar(dto.avatar);
		info.setPosition(dto.position);
		info.setProfile(dto.profile);
		info.setGender(dto.gender);
		info.setAddress(dto.address);
		info.setMarital(dto.marital);
		info.setChilds(dto.childs);
		info.setNationality(dto.nationality);
		info.setReligion(dto.religion);
		info.setDob(dto.dob);
		info.setPhone(dto.phone);
		info.setAdditional(dto.additional);

		info.setSocials(StringUtility.listToJson(dto.socials));
		info.setActivities(StringUtility.listToJson(dto.activities));
		info.setHobbies(StringUtility.listToJson(dto.hobbies));
		
		List<Skill> skills = new ArrayList<>();
		for (SkillDto skill : dto.skills) {
			skills.add(new Skill(null, skill.name, skill.rate));
		}
		info.setSkills(skills);
		
		List<Scholarship> scholarships = new ArrayList<>();
		for (ScholarshipDto scholarship : dto.scholarships) {
			scholarships.add(new Scholarship(null, scholarship.name, scholarship.organization, scholarship.year));
		}
		info.setScholarships(scholarships);

		List<Award> awards = new ArrayList<>();
		for (AwardDto award : dto.awards) {
			awards.add(new Award(null, award.name, award.organization, award.year));
		}
		info.setAwards(awards);

		List<Certificate> certificates = new ArrayList<>();
		for (CertificateDto certificate : dto.certificates) {
			certificates.add(new Certificate(null, certificate.name, certificate.organization, certificate.year));
		}
		info.setCertificates(certificates);

		List<Membership> memberships = new ArrayList<>();
		for (MembershipDto membership : dto.memberships) {
			memberships.add(new Membership(null, membership.role, membership.organization, membership.start, membership.end));
		}
		info.setMemberships(memberships);

		List<Thesis> theses = new ArrayList<>();
		for (ThesisDto thesis : dto.theses) {
			theses.add(new Thesis(null, thesis.title, thesis.advisor, thesis.description));
		}
		info.setTheses(theses);

		List<Presentation> presentations = new ArrayList<>();
		for (PresentationDto presentation : dto.presentations) {
			presentations.add(new Presentation(null, presentation.title, presentation.conference, presentation.location, presentation.year));
		}
		info.setPresentations(presentations);

		List<Book> books = new ArrayList<>();
		for (BookDto book : dto.books) {
			books.add(new Book(null, book.title, book.publisher, book.location, StringUtility.listToJson(book.authors), book.year));
		}
		info.setBooks(books);

		List<Journal> journals = new ArrayList<>();
		for (JournalDto journal : dto.journals) {
			journals.add(new Journal(null, journal.title, journal.name, StringUtility.listToJson(journal.authors), journal.year, journal.volume, journal.issue, journal.start, journal.end));
		}
		info.setJournals(journals);

		List<Education> educations = new ArrayList<>();
		for (EducationDto education : dto.educations) {
			educations.add(new Education(null, education.school, education.field, education.start, education.end, education.description));
		}
		info.setEducations(educations);

		List<Work> works = new ArrayList<>();
		for (WorkDto work : dto.works) {
			works.add(new Work(null, work.company, work.position, work.start, work.end, work.description));
		}
		info.setWorks(works);

		List<Project> projects = new ArrayList<>();
		for (ProjectDto project : dto.projects) {
			projects.add(new Project(null, project.company, project.name, project.start, project.end, project.description));
		}
		info.setProjects(projects);

		return info;

	}

}
