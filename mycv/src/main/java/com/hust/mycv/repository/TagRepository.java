package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.Tag;

public interface TagRepository extends JpaRepository<Tag, Integer> {

	Tag findByName(String name);

}
