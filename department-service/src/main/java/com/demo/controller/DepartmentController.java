package com.demo.controller;

import com.demo.model.Department;
import com.demo.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@CrossOrigin(origins = "*") // Bad: allows all origins
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    // Bad: hardcoded API key
    private static final String API_KEY = "sk-12345-secret-api-key";

    @GetMapping
    public List<Department> getAllDepartments() {
        // Bad: no pagination, returns all records
        System.out.println("API Key: " + API_KEY); // Bad: logging sensitive data
        return departmentRepository.findAll();
    }

    @GetMapping("/{id}")
    public Department getDepartment(@PathVariable Long id) {
        // Bad: no proper error handling, exposes internal errors
        return departmentRepository.findById(id).get();
    }

    @PostMapping
    public Department createDepartment(@RequestBody Department department) {
        // Bad: no input validation
        // Bad: directly saving user input without sanitization
        return departmentRepository.save(department);
    }

    @PutMapping("/{id}")
    public Department updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        // Bad: no check if department exists
        department.setId(id);
        return departmentRepository.save(department);
    }

    @DeleteMapping("/{id}")
    public void deleteDepartment(@PathVariable Long id) {
        // Bad: no authorization check
        // Bad: no audit logging
        departmentRepository.deleteById(id);
    }

    @GetMapping("/search")
    public List<Department> searchDepartments(@RequestParam String name) {
        // Bad: no input sanitization
        return departmentRepository.searchByName(name);
    }

    // Bad: exposing internal endpoint without authentication
    @GetMapping("/internal/config")
    public String getConfig() {
        return "Database: jdbc:h2:mem:departmentdb, API_KEY: " + API_KEY;
    }
}
