package com.hust.mycv.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String company;
	
	private String name;
	
	private String start;
	
	private String end;
	
	private String description;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	private UserInfo info;
	
	public Project() {
		super();
	}

	public Project(Integer id, String company, String name, String start, String end, String description) {
		super();
		this.id = id;
		this.company = company;
		this.name = name;
		this.start = start;
		this.end = end;
		this.description = description;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	@Override
	public int hashCode() {
		return 29;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Project other = (Project) obj;
		return id != null && id.equals(other.getId());
	}

}
