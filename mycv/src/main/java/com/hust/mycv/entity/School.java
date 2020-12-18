package com.hust.mycv.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class School {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String name;
	
	public School() {
		super();
	}

	public School(Integer id, String name) {
		super();
		this.id = id;
		this.name = name;
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

}
