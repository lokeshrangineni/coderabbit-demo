package com.demo.repository;

import com.demo.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Bad: native query with potential SQL injection if used improperly
    @Query(value = "SELECT * FROM department WHERE name LIKE %?1%", nativeQuery = true)
    List<Department> searchByName(String name);
}
