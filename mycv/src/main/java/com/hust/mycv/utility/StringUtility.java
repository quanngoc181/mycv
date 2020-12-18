package com.hust.mycv.utility;

import com.fasterxml.jackson.databind.ObjectMapper;

public class StringUtility {
	public static String getUserName(String authString) {
		int index = authString.indexOf(",");
		return authString.substring(5, index);
	}
	
	public static String jsonToParagraph(String json) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			String[] strs = mapper.readValue(json, String[].class);
			
			String ret = "";
			
			for (String string : strs) {
				ret += string + " ";
			}
			
			return ret.trim();
		} catch (Exception e) {
			System.out.println(e);
		}
		
		return "";
	}
}
