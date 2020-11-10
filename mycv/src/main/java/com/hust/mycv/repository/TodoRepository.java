package com.hust.mycv.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hust.mycv.entity.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

}
