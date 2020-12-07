package com.hust.mycv.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Thesis {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String title;
	
	private String advisor;
	
	private String description;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	private UserInfo info;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private CvInfo cvInfo;
	
	public Thesis() {
		super();
	}

	public Thesis(Integer id, String title, String advisor, String description) {
		super();
		this.id = id;
		this.title = title;
		this.advisor = advisor;
		this.description = description;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAdvisor() {
		return advisor;
	}

	public void setAdvisor(String advisor) {
		this.advisor = advisor;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public UserInfo getInfo() {
		return info;
	}

	public void setInfo(UserInfo info) {
		this.info = info;
	}

	public CvInfo getCvInfo() {
		return cvInfo;
	}

	public void setCvInfo(CvInfo cvInfo) {
		this.cvInfo = cvInfo;
	}

	@Override
	public int hashCode() {
		return 23;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Thesis other = (Thesis) obj;
		return id != null && id.equals(other.getId());
	}

}
