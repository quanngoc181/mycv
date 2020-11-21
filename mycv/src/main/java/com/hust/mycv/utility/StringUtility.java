package com.hust.mycv.utility;

public class StringUtility {
	public static String getUserName(String authString) {
		int index = authString.indexOf(",");
		return authString.substring(5, index);
	}
}
