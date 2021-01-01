package com.hust.mycv.utility;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import com.hust.mycv.dto.CvDto;

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

	public static boolean checkTag(List<String> cvTag, String[] searchTag) {
		if (cvTag == null || searchTag == null)
			return false;

		boolean ret = false;
		for (String tag : searchTag) {
			if (cvTag.contains(tag))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkAddress(String cvAddress, String[] searchAddress) {
		if (cvAddress == null || searchAddress == null)
			return false;
		
		boolean ret = false;
		for (String address : searchAddress) {
			if (cvAddress.contains(address))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkSchool(CvDto cv, String[] schools) {
		List<String> list = cv.educations.stream().map(c -> c.school).collect(Collectors.toList());
		
		boolean ret = false;
		for (String field : schools) {
			if (list.contains(field))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkField(CvDto cv, String[] fields) {
		List<String> list = cv.educations.stream().map(c -> c.field).collect(Collectors.toList());
		
		boolean ret = false;
		for (String field : fields) {
			if (list.contains(field))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkCompany(CvDto cv, String[] companies) {
		List<String> list = cv.works.stream().map(c -> c.company).collect(Collectors.toList());
		
		boolean ret = false;
		for (String company : companies) {
			if (list.contains(company))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkPosition(CvDto cv, String[] positions) {
		List<String> list = cv.works.stream().map(c -> c.position).collect(Collectors.toList());
		
		boolean ret = false;
		for (String position : positions) {
			if (list.contains(position))
				ret = true;
		}

		return ret;
	}
	
	public static boolean checkSkill(CvDto cv, String[] skills) {
		List<String> list = cv.skills.stream().map(c -> c.name).collect(Collectors.toList());
		
		boolean ret = false;
		for (String skill : skills) {
			if (list.contains(skill))
				ret = true;
		}

		return ret;
	}
	
}
