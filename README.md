System Description:

This project is a complete *CRUD backend API* built with *Node.js*, *Express*, and *PostgreSQL*.  
It manages *Users* and *Products*, supporting scalable architecture where products can later be linked to specific users.

### Features:
- Full CRUD operations for *Users* and *Products*
- Secure password hashing with bcrypt
- Logging system with *EventEmitter*
- Real-time logs using *morgan*
- Scalable structure (separate `controllers`, `routes`, and `models`)
- PostgreSQL as the main database
- Environment variable support with *dotenv*

Installed Packages:
- express
- pg
- dotenv
- morgan
- bcrypt

### Database Setup
Before running the server, create the following table in your PostgreSQL database:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price INT NOT NULL,
  quantity INT,
  description TEXT
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT
);

### Environment Variables

Create a `.env` file in the root directory and add the following:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name

 Replace each value with your actual PostgreSQL credentials.
