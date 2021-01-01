package com.hust.mycv.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.Address;
import com.hust.mycv.repository.AddressRepository;
import com.hust.mycv.service.AddressService;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	AddressRepository addressRepository;

	public void updateAddress(CvDto dto) {
		if (dto.address == null)
			return;
		
		String[] addresses = dto.address.split("[-|,]");

		for (String address : addresses) {
			if (address != null) {
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
