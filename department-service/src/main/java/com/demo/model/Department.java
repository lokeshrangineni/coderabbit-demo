package com.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    // Bad: storing sensitive data without encryption
    private String budget;

    // Bad: no validation annotations
    private String managerPassword;

    public Department() {}

    public Department(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Bad: exposing all fields including sensitive ones
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }

    public String getManagerPassword() { return managerPassword; }
    public void setManagerPassword(String managerPassword) { this.managerPassword = managerPassword; }

    // Bad: toString exposes sensitive data
    @Override
    public String toString() {
        return "Department{id=" + id + ", name=" + name + ", budget=" + budget + ", managerPassword=" + managerPassword + "}";
    }
}
