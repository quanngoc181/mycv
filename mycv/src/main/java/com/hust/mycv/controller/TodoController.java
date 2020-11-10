package com.hust.mycv.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.hust.mycv.entity.Todo;
import com.hust.mycv.repository.TodoRepository;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
public class TodoController {

	@Autowired
	private TodoRepository todoRepository;

	@GetMapping("/todo")
	public Iterable<Todo> findAll() {
		Iterable<Todo> todoList = todoRepository.findAll();
		return todoList;
	}

	@GetMapping("/todo/{id}")
	public Todo findById(@PathVariable Integer id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found."));
		return todo;
	}

	@PostMapping("/todo")
	public Todo addTodo(@RequestBody Todo todo) {
		Todo res = todoRepository.save(todo);
		return res;
	}

	@PutMapping("/todo")
	public Todo updateTodo(@RequestBody Todo todo) {
		Todo res = todoRepository.save(todo);
		return res;
	}

	@DeleteMapping("/todo/{id}")
	public Todo deleteTodo(@PathVariable Integer id) {
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found."));
		todoRepository.delete(todo);
		return todo;
	}

}
