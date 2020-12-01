package com.hust.mycv.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class UserInfo {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;

	private String username;

	private String fullName;

	private String email;

	@Column(columnDefinition = "MEDIUMBLOB")
	private byte[] avatar;

	private String position;

	private String profile;

	private String gender;

	private String address;

	private String marital;

	private int childs;

	private String nationality;

	private String religion;

	private String dob;

	private String phone;

	private String socials;
	
	private String additional;

	public UserInfo() {
		super();
	}

	public UserInfo(Integer id, String username, String fullName, String email, byte[] avatar, String position, String profile, String gender, String address, String marital, int childs, String nationality, String religion, String dob, String phone, String socials, String additional) {
		super();
		this.id = id;
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
		this.socials = socials;
		this.additional = additional;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
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

	public byte[] getAvatar() {
		return avatar;
	}

	public void setAvatar(byte[] avatar) {
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

	public int getChilds() {
		return childs;
	}

	public void setChilds(int childs) {
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

	public String getSocials() {
		return socials;
	}

	public void setSocials(String socials) {
		this.socials = socials;
	}

	public String getAdditional() {
		return additional;
	}

	public void setAdditional(String additional) {
		this.additional = additional;
	}
}
