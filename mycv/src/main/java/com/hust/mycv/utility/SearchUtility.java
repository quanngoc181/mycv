package com.hust.mycv.utility;

public class SearchUtility {
	public static boolean checkMale(String gender) {
		if(gender == null) return false;
		return StringUtility.normalizeLower(gender).equals("nam") || StringUtility.normalizeLower(gender).equals("m") || StringUtility.normalizeLower(gender).equals("male");
	}
	
	public static boolean checkFemale(String gender) {
		if(gender == null) return false;
		return StringUtility.normalizeLower(gender).equals("nu") || StringUtility.normalizeLower(gender).equals("f") || StringUtility.normalizeLower(gender).equals("female");
	}
}
