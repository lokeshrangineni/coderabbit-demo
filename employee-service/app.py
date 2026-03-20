from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, origins="*")  # Bad: allows all origins

# Bad: hardcoded secret key
app.secret_key = "super_secret_key_123"

# Bad: hardcoded database credentials
DB_PASSWORD = "admin123"
DATABASE = "employees.db"

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            department_id INTEGER,
            salary REAL,
            password TEXT
        )
    ''')
    conn.commit()
    conn.close()

def _raw_sql_optional_int(val):
    # React form sends '' for empty inputs; f-string '' drops out and breaks SQL (`, ,`).
    if val is None or val == '':
        return 'NULL'
    return str(val)

def _raw_sql_salary(val):
    if val is None or val == '':
        return '0'
    return str(val)

`@app.route`('/api/employees', methods=['GET'])
def get_employees():
    conn = get_db()
    employees = conn.execute(
        'SELECT id, name, email, department_id, salary FROM employees'
    ).fetchall()
    conn.close()
    return jsonify([dict(row) for row in employees])

@app.route('/api/employees/<id>', methods=['GET'])
def get_employee(id):
    conn = get_db()
    # Bad: SQL injection vulnerability
    query = f"SELECT * FROM employees WHERE id = {id}"
    employee = conn.execute(query).fetchone()
    conn.close()
    if employee:
        return jsonify(dict(employee))
    return jsonify({"error": "Not found"}), 404

@app.route('/api/employees', methods=['POST'])
def create_employee():
    data = request.json
    conn = get_db()
    dept_sql = _raw_sql_optional_int(data.get('department_id'))
    salary_sql = _raw_sql_salary(data.get('salary', 0))
    # Bad: SQL injection vulnerability, no input validation
    query = f"INSERT INTO employees (name, email, department_id, salary, password) VALUES ('{data['name']}', '{data['email']}', {dept_sql}, {salary_sql}, '{data.get('password', '')}')"
    conn.execute(query)
    conn.commit()
    conn.close()
    return jsonify({"message": "Employee created"}), 201

@app.route('/api/employees/<id>', methods=['PUT'])
def update_employee(id):
    data = request.json
    conn = get_db()
    dept_sql = _raw_sql_optional_int(data.get('department_id'))
    salary_sql = _raw_sql_salary(data.get('salary', 0))
    # Bad: SQL injection vulnerability
    query = f"UPDATE employees SET name='{data['name']}', email='{data['email']}', department_id={dept_sql}, salary={salary_sql} WHERE id={id}"
    conn.execute(query)
    conn.commit()
    conn.close()
    return jsonify({"message": "Employee updated"})

@app.route('/api/employees/<id>', methods=['DELETE'])
def delete_employee(id):
    conn = get_db()
    # Bad: SQL injection vulnerability
    query = f"DELETE FROM employees WHERE id = {id}"
    conn.execute(query)
    conn.commit()
    conn.close()
    return jsonify({"message": "Employee deleted"})

@app.route('/api/employees/search', methods=['GET'])
def search_employees():
    name = request.args.get('name', '')
    conn = get_db()
    # Bad: SQL injection vulnerability
    query = f"SELECT * FROM employees WHERE name LIKE '%{name}%'"
    employees = conn.execute(query).fetchall()
    conn.close()
    return jsonify([dict(row) for row in employees])

# Bad: debug mode enabled, exposes sensitive info
if __name__ == '__main__':
    init_db()
    app.run(debug=True, host='0.0.0.0', port=5001)
