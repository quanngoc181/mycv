package com.hust.mycv.utility;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hust.mycv.dto.CvSectionDto;

public class StringUtility {

	public static String getUserName(String authString) {
		int index = authString.indexOf(",");
		return authString.substring(5, index);
	}

	public static List<String> jsonToList(String json) {
		ObjectMapper mapper = new ObjectMapper();

		if (json == null)
			return new ArrayList<>();

		try {
			List<String> list = Arrays.asList(mapper.readValue(json, String[].class));
			return list;
		} catch (Exception e) {
			System.out.println("Convert Json to List error.");
		}

		return new ArrayList<>();
	}

	public static String listToJson(List<String> list) {
		ObjectMapper mapper = new ObjectMapper();

		if (list == null)
			return "[]";

		try {
			String json = mapper.writeValueAsString(list);
			return json;
		} catch (Exception e) {
			System.out.println("Convert List to Json error.");
		}

		return "[]";
	}
	
	public static List<CvSectionDto> jsonToListSection(String json) {
		ObjectMapper mapper = new ObjectMapper();

		if (json == null)
			return new ArrayList<>();

		try {
			List<CvSectionDto> list = Arrays.asList(mapper.readValue(json, CvSectionDto[].class));
			return list;
		} catch (Exception e) {
			System.out.println("Convert Json to Section error.");
		}

		return new ArrayList<>();
	}

	public static String listSectionToJson(List<CvSectionDto> list) {
		ObjectMapper mapper = new ObjectMapper();

		if (list == null)
			return "[]";

		try {
			String json = mapper.writeValueAsString(list);
			return json;
		} catch (Exception e) {
			System.out.println("Convert Section to Json error.");
		}

		return "[]";
	}
	
	public static List<List<CvSectionDto>> jsonToList2dSection(String json) {
		ObjectMapper mapper = new ObjectMapper();
		
		List<List<CvSectionDto>> list = new ArrayList<List<CvSectionDto>>();

		if (json == null)
			return list;

		try {
			CvSectionDto[][] arrays = mapper.readValue(json, CvSectionDto[][].class);
			
		    for (CvSectionDto[] array : arrays) {
		        list.add(Arrays.asList(array));
		    }
		    
		    return list;
		} catch (Exception e) {
			System.out.println("Convert Json to 2d Section error.");
		}

		return list;
	}

	public static String list2dSectionToJson(List<List<CvSectionDto>> list) {
		ObjectMapper mapper = new ObjectMapper();

		if (list == null)
			return "[[],[]]";

		try {
			String json = mapper.writeValueAsString(list);
			return json;
		} catch (Exception e) {
			System.out.println("Convert 2d Section to Json error.");
		}

		return "[[],[]]";
	}

	public static String jsonToString(String json) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			List<String> list = Arrays.asList(mapper.readValue(json, String[].class));

			String ret = "";

			for (String string : list) {
				ret += " " + string;
			}

			return ret;
		} catch (Exception e) {
			System.out.println(e);
		}

		return "";
	}

	public static String normalizeLower(String in) {
		String out = Normalizer.normalize(in, Normalizer.Form.NFD);
		out = out.replaceAll("\\p{M}", "");
		out = out.toLowerCase();
		out = out.replaceAll("đ", "d");
		return out;
	}

}
