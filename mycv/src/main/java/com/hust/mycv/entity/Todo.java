package com.hust.mycv.entity;

public class Todo {

	private long id;
	private String title;
	private String content;
	private boolean done;

	public Todo(long id, String title, String content, boolean done) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.done = done;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

}
