package com.hust.mycv.utility;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

public class StringUtility {
	public static String getUserName(String authString) {
		int index = authString.indexOf(",");
		return authString.substring(5, index);
	}

	public static List<String> jsonToList(String json) {
		ObjectMapper mapper = new ObjectMapper();

		try {
			List<String> list = Arrays.asList(mapper.readValue(json, String[].class));
			return list;
		} catch (Exception e) {
			System.out.println(e);
		}

		return new ArrayList<>();
	}

	public static String normalizeLower(String in) {
		String out = Normalizer.normalize(in, Normalizer.Form.NFD);
		out = out.replaceAll("\\p{M}", "");
		out = out.toLowerCase();
		out = out.replaceAll("đ", "d");
		return out;
	}
}
