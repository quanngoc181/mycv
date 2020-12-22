package com.hust.mycv.utility;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import com.hust.mycv.entity.Cv;

public class SearchUtility {
	public static boolean checkMale(String gender) {
		if (gender == null)
			return false;
		return StringUtility.normalizeLower(gender).equals("nam")
				|| StringUtility.normalizeLower(gender).equals("m")
				|| StringUtility.normalizeLower(gender).equals("male");
	}

	public static boolean checkFemale(String gender) {
		if (gender == null)
			return false;
		return StringUtility.normalizeLower(gender).equals("nu")
				|| StringUtility.normalizeLower(gender).equals("f")
				|| StringUtility.normalizeLower(gender).equals("female");
	}

	public static boolean checkSingle(String marital) {
		if (marital == null)
			return false;
		return StringUtility.normalizeLower(marital).contains("doc")
				|| StringUtility.normalizeLower(marital).contains("sing");
	}

	public static boolean checkMarried(String marital) {
		if (marital == null)
			return false;
		return StringUtility.normalizeLower(marital).contains("ket")
				|| StringUtility.normalizeLower(marital).contains("marr");
	}

	public static boolean checkDivorced(String marital) {
		if (marital == null)
			return false;
		return StringUtility.normalizeLower(marital).contains("li")
				|| StringUtility.normalizeLower(marital).contains("ly")
				|| StringUtility.normalizeLower(marital).contains("divo");
	}

	public static boolean checkWidowed(String marital) {
		if (marital == null)
			return false;
		return StringUtility.normalizeLower(marital).contains("goa")
				|| StringUtility.normalizeLower(marital).contains("wido");
	}

	public static boolean checkAge(String dob, int[] age) {
		if (dob == null)
			return false;

		LocalDate date = null;
		try {
			date = LocalDate.parse(dob, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
		} catch (Exception e) {
		}
		try {
			date = LocalDate.parse(dob, DateTimeFormatter.ofPattern("yyyy/MM/dd"));
		} catch (Exception e) {
		}
		try {
			date = LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd-MM-yyyy"));
		} catch (Exception e) {
		}
		try {
			date = LocalDate.parse(dob, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
		} catch (Exception e) {
		}

		if (date == null)
			return false;

		LocalDate now = LocalDate.now();
		int cvAge = now.getYear() - date.getYear();

		return cvAge >= age[0] && cvAge <= age[1];
	}

	public static boolean checkTag(String tagString, String[] tag) {
		if (tagString == null)
			return false;

		List<String> listTag = StringUtility.jsonToList(tagString);

		boolean ret = false;
		for (String string : tag) {
			if (listTag.contains(string))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkAddress(String addressString, String[] address) {
		if (addressString == null)
			return false;
		
		boolean ret = false;
		for (String string : address) {
			if (addressString.contains(string))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkSchool(Cv cv, String[] field) {
		List<String> list = cv.getEducations().stream().map(c -> c.getSchool()).collect(Collectors.toList());
		
		boolean ret = false;
		for (String string : field) {
			if (list.contains(string))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkField(Cv cv, String[] field) {
		List<String> list = cv.getEducations().stream().map(c -> c.getField()).collect(Collectors.toList());
		
		boolean ret = false;
		for (String string : field) {
			if (list.contains(string))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkCompany(Cv cv, String[] field) {
		List<String> list = cv.getWorks().stream().map(c -> c.getCompany()).collect(Collectors.toList());
		
		boolean ret = false;
		for (String string : field) {
			if (list.contains(string))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkPosition(Cv cv, String[] field) {
		List<String> list = cv.getWorks().stream().map(c -> c.getPosition()).collect(Collectors.toList());
		
		boolean ret = false;
		for (String string : field) {
			if (list.contains(string))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkSkill(Cv cv, String[] field) {
		List<String> list = cv.getSkills().stream().map(c -> c.getName()).collect(Collectors.toList());
		
		boolean ret = false;
		for (String string : field) {
			if (list.contains(string))
				ret = true;
		}

		return ret;
	}
	
}
