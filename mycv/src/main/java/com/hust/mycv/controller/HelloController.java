package com.hust.mycv.controller;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.entity.HelloWorld;

@RestController
public class HelloController {

	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/")
	public HelloWorld greeting(@RequestParam(defaultValue = "World") String name) {

		return new HelloWorld(counter.incrementAndGet(), String.format("Hello, %s!", name));

	}

}
