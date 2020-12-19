package com.hust.mycv.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.entity.Address;
import com.hust.mycv.entity.Cv;
import com.hust.mycv.repository.AddressRepository;

@Service
public class AddressService {
	
	@Autowired
	AddressRepository addressRepository;
	
	public AddressService() {
		super();
	}
	
	public void updateAddress(Cv cv) {
		String[] addresses = cv.getAddress().split("[-|,]");
		
		for (String address : addresses) {
			if(address != null) {
				address = address.trim();
				
				Address exist = addressRepository.findByName(address);
				
				if (exist == null) {
					Address newAddress = new Address();
					newAddress.setName(address);
					addressRepository.save(newAddress);
				}
			}
		}
	}

}
