System Description:
This is a simple CRUD API for managing products using Node.js, Express, and PostgreSQL. 
It supports creating, reading, updating, and deleting product entries.

Installed Packages:
- express
- pg
- dotenv
- morgan

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

### Environment Variables

Create a `.env` file in the root directory and add the following:

DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name

 Replace each value with your actual PostgreSQL credentials.
