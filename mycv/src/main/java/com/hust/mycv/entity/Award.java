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
public class Award {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String name;
	
	private String organization;
	
	private String year;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	private UserInfo info;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private CvInfo cvInfo;
	
	public Award() {
		super();
	}

	public Award(Integer id, String name, String organization, String year) {
		super();
		this.id = id;
		this.name = name;
		this.organization = organization;
		this.year = year;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
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
		return 20;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Award other = (Award) obj;
		return id != null && id.equals(other.getId());
	}

}
