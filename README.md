# CodeRabbit Demo

A demo project to evaluate the CodeRabbit code review tool features.

## WARNING: Intentionally Vulnerable Code

**This project contains intentionally bad code with security vulnerabilities for testing purposes. DO NOT use this code in production or as a reference for secure coding practices.**

### Known Vulnerabilities Include:
- SQL Injection
- XSS (Cross-Site Scripting)
- Hardcoded credentials and API keys
- No input validation
- Exposed debug information
- Insecure CORS configuration
- Client-side authentication bypass
- eval() usage with user input
- Passwords stored and displayed in plain text

## Architecture

```
┌─────────────────┐     ┌──────────────────┐
│  React Frontend │────▶│  Python Backend  │
│   (Port 3000)   │     │  Employee Svc    │
│                 │     │   (Port 5001)    │
│                 │     └──────────────────┘
│                 │
│                 │     ┌───────────────────┐
│                 │────▶│   Java Backend    │
└─────────────────┘     │  Department Svc   │
                        │   (Port 8080)     │
                        └───────────────────┘
```

## Services

| Service | Technology | Port | Purpose |
|---------|-----------|------|---------|
| Employee Service | Python/Flask | 5001 | Employee CRUD operations |
| Department Service | Java/Spring Boot | 8080 | Department CRUD operations |
| Frontend | React | 3000 | Web UI for both services |

## Running the Application

### Employee Service (Python)
```bash
cd employee-service
pip install -r requirements.txt
python app.py
```

### Department Service (Java)
```bash
cd department-service
./mvnw spring-boot:run
# or
mvn spring-boot:run
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Employee Service (http://localhost:5001)
- `GET /api/employees` - List all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
- `GET /api/employees/search?name=` - Search employees

### Department Service (http://localhost:8080)
- `GET /api/departments` - List all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department
- `GET /api/departments/search?name=` - Search departments
