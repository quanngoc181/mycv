package com.hust.mycv.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hust.mycv.entity.Cv;
import com.hust.mycv.entity.Position;
import com.hust.mycv.repository.PositionRepository;

@Service
public class PositionService {

	@Autowired
	PositionRepository positionRepository;

	public PositionService() {
		super();
	}

	public void updatePosition(Cv cv) {
		List<String> positions = cv.getWorks().stream().map(e -> e.getPosition()).collect(Collectors.toList());
		if (cv.getPosition() != null) {
			positions.add(cv.getPosition());
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
