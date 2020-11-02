package com.hust.mycv.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hust.mycv.entity.Todo;

@RestController
@CrossOrigin(origins = { "http://localhost:3000" })
public class TodoController {

	private List<Todo> todoList = new ArrayList<Todo>();

	@GetMapping("/todo")
	public List<Todo> findAll() {
		return todoList;
	}

	@GetMapping("/todo/{id}")
	public Todo findById(@PathVariable Long id) {
		Todo todo = todoList.stream().filter(td -> td.getId() == id).findAny().orElse(null);
		return todo;
	}

	@PostMapping("/todo")
	public Todo addTodo(@RequestBody Todo todo) {
		long id;
		if (todoList.size() == 0) {
			id = 1;
		} else {
			Todo last = todoList.get(todoList.size() - 1);
			id = last.getId() + 1;
		}

		todo.setId(id);

		todoList.add(todo);

		return todo;
	}

	@PutMapping("/todo")
	public Todo updateTodo(@RequestBody Todo todo) {
		Todo exist = todoList.stream().filter(td -> td.getId() == todo.getId()).findAny().orElse(null);

		if (exist != null) {
			todo.setId(exist.getId());

			todoList.set(todoList.indexOf(exist), todo);

			return todo;
		} else {
			return null;
		}
	}

	@DeleteMapping("/todo/{id}")
	public Todo deleteTodo(@PathVariable Long id) {
		Todo todo = todoList.stream().filter(td -> td.getId() == id).findAny().orElse(null);
		if (todo != null) {
			todoList.remove(todo);

			return todo;
		} else {
			return null;
		}
	}

}
