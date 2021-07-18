package com.hust.mycv.entity;

import java.util.List;

public class HitsObject {
	
	private List<HitsElement> hits;
	
	public HitsObject() {
		super();
	}

	public HitsObject(List<HitsElement> hits) {
		super();
		this.hits = hits;
	}

	public List<HitsElement> getHits() {
		return hits;
	}

	public void setHits(List<HitsElement> hits) {
		this.hits = hits;
	}
	
}
