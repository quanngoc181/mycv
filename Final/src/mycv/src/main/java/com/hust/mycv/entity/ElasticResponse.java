package com.hust.mycv.entity;

public class ElasticResponse {
	
	private HitsObject hits;
	
	public ElasticResponse() {
		super();
	}

	public ElasticResponse(HitsObject hits) {
		super();
		this.hits = hits;
	}

	public HitsObject getHits() {
		return hits;
	}

	public void setHits(HitsObject hits) {
		this.hits = hits;
	}
	
}
