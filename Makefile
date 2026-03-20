.PHONY: all install run-employee run-department run-frontend clean

# Install all dependencies
install: install-employee install-department install-frontend

install-employee:
	cd employee-service && pip install -r requirements.txt

install-department:
	cd department-service && mvn dependency:resolve

install-frontend:
	cd frontend && npm install

# Run individual services
run-employee:
	cd employee-service && python app.py

run-department:
	cd department-service && mvn spring-boot:run

run-frontend:
	cd frontend && npm start

# Run all services (requires multiple terminals or background processes)
run-all:
	@echo "Starting all services..."
	@echo "Run these commands in separate terminals:"
	@echo "  make run-employee    (Port 5001)"
	@echo "  make run-department  (Port 8080)"
	@echo "  make run-frontend    (Port 3000)"

# Clean build artifacts
clean:
	rm -f employee-service/employees.db
	rm -rf department-service/target
	rm -rf frontend/node_modules frontend/build

# Help
help:
	@echo "Available targets:"
	@echo "  install            - Install all dependencies"
	@echo "  install-employee   - Install Python dependencies"
	@echo "  install-department - Install Java dependencies"
	@echo "  install-frontend   - Install Node dependencies"
	@echo "  run-employee       - Run Employee Service (Port 5001)"
	@echo "  run-department     - Run Department Service (Port 8080)"
	@echo "  run-frontend       - Run React Frontend (Port 3000)"
	@echo "  run-all            - Show instructions to run all services"
	@echo "  clean              - Remove build artifacts"
