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
public class Membership {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String role;
	
	private String organization;
	
	private String start;
	
	private String end;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	private UserInfo info;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	private CvInfo cvInfo;
	
	public Membership() {
		super();
	}

	public Membership(Integer id, String role, String organization, String start, String end) {
		super();
		this.id = id;
		this.role = role;
		this.organization = organization;
		this.start = start;
		this.end = end;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getOrganization() {
		return organization;
	}

	public void setOrganization(String organization) {
		this.organization = organization;
	}
	
	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
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
		return 22;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Membership other = (Membership) obj;
		return id != null && id.equals(other.getId());
	}

}
