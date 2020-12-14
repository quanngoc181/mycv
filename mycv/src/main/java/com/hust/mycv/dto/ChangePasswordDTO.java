package com.hust.mycv.dto;

public class ChangePasswordDTO {
	
	public String oldpassword;

	public String newpassword;
	
	public ChangePasswordDTO() {}

	public String getOldpassword() {
		return oldpassword;
	}

	public void setOldpassword(String oldpassword) {
		this.oldpassword = oldpassword;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

}
