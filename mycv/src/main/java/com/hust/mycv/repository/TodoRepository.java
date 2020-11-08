package com.hust.mycv.repository;

import org.springframework.data.repository.CrudRepository;

import com.hust.mycv.entity.Todo;

public interface TodoRepository extends CrudRepository<Todo, Integer> {

}
