package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.Position;

public interface PositionRepository extends JpaRepository<Position, Integer> {
	
	Position findByName(String name);

}
