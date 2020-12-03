package com.hust.mycv.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Work {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String company;
	
	private String position;
	
	private String start;
	
	private String end;
	
	private String description;
	
	@JsonBackReference
	@ManyToOne(fetch = FetchType.LAZY)
	private UserInfo info;
	
	public Work() {
		super();
	}

	public Work(Integer id, String company, String position, String start, String end, String description) {
		super();
		this.id = id;
		this.company = company;
		this.position = position;
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

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
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
		return 28;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Work other = (Work) obj;
		return id != null && id.equals(other.getId());
	}

}
