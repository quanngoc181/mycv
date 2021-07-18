package com.hust.mycv.configuration;

public class SecurityConstant {
	public static final String SIGN_UP_URL = "/users";
	public static final String KEY = "THIS_IS_MYCV_APPLICATION_SECRET_KEY_AND_IT_MUST_BE_64_CHARACTERS";
	public static final String HEADER_NAME = "Authorization";
	public static final Long EXPIRATION_TIME = 1000L * 60 * 60 * 24;
}
