# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Employee & Department Management System - a multi-service demo application for evaluating CodeRabbit code review tool. **Contains intentionally vulnerable code for testing purposes.**

## Architecture

- **Frontend**: React app (port 3000) - connects to both backend services
- **Employee Service**: Python/Flask REST API (port 5001) with SQLite
- **Department Service**: Java/Spring Boot REST API (port 8080) with H2 database

## Build & Run Commands

### Employee Service (Python)
```bash
cd employee-service
pip install -r requirements.txt
python app.py
```

### Department Service (Java)
```bash
cd department-service
mvn spring-boot:run
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## Project Structure

```
├── employee-service/       # Python Flask backend
│   ├── app.py              # Main application with all endpoints
│   └── requirements.txt
├── department-service/     # Java Spring Boot backend
│   ├── pom.xml
│   └── src/main/java/com/demo/
│       ├── DepartmentApplication.java
│       ├── controller/DepartmentController.java
│       ├── model/Department.java
│       └── repository/DepartmentRepository.java
└── frontend/               # React frontend
    └── src/
        ├── App.js
        ├── api/            # API client modules
        └── components/     # React components
```

## API Endpoints

- Employee: `GET|POST /api/employees`, `GET|PUT|DELETE /api/employees/:id`
- Department: `GET|POST /api/departments`, `GET|PUT|DELETE /api/departments/:id`
