package com.hust.mycv.dto;

public class ElasticResponse {
	
	public HitsObject hits;
	
	public ElasticResponse() {
		super();
	}

	public ElasticResponse(HitsObject hits) {
		super();
		this.hits = hits;
	}
	
}
