package com.hust.mycv.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.dto.CvDto;
import com.hust.mycv.entity.Position;
import com.hust.mycv.repository.PositionRepository;
import com.hust.mycv.service.PositionService;

@Service
public class PositionServiceImpl implements PositionService {

	@Autowired
	PositionRepository positionRepository;

	public PositionServiceImpl() {
		super();
	}

	public void updatePosition(CvDto dto) {
		List<String> positions = dto.works.stream().map(e -> e.position).collect(Collectors.toList());
		if (dto.position != null) {
			positions.add(dto.position);
		}

		for (String position : positions) {
			if (position != null) {
				position = position.trim();

				Position exist = positionRepository.findByName(position);

				if (exist == null) {
					Position newPosition = new Position();
					newPosition.setName(position);
					positionRepository.save(newPosition);
				}
			}
		}
	}

}
