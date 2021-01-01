package com.hust.mycv.entity;

public class HitsElement {

	private Integer _id;
	
	private HitsSource _source;

	public HitsElement() {
		super();
	}

	public HitsElement(Integer _id, HitsSource _source) {
		super();
		this._id = _id;
		this._source = _source;
	}

	public Integer get_id() {
		return _id;
	}

	public void set_id(Integer _id) {
		this._id = _id;
	}

	public HitsSource get_source() {
		return _source;
	}

	public void set_source(HitsSource _source) {
		this._source = _source;
	}

}
