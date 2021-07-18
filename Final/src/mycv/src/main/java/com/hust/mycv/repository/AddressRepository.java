package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	Address findByName(String name);
	
}
