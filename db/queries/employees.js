import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const sql = `
  INSERT INTO employees (name, birthday, salary)
  VALUES ($1, $2, $3)
  RETURNING *
  `;

  const {rows: [newEmployee]} = await db.query(sql, [name, birthday, salary]);
  return newEmployee;
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const sql = `
    SELECT *
    FROM employees
  `;
  const { rows: employees } = await db.query(sql);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const sql = `
      SELECT * FROM employees
      WHERE id = $1
    `;

  const {rows: [employee]} = await (db.query(sql, [id]));
  return employee;}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `
    UPDATE employees
    SET 
      name = $1,  
      birthday = $2,
      salary = $3
    WHERE id = $4
    RETURNING *;
  `;

  const {rows: [updatedEmployee]} = await db.query(sql, [name, birthday, salary, id]);
  return updatedEmployee;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const sql = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;
  `;

  const {rows: [deletedEmployee]} = await db.query(sql, [id]);
  return deletedEmployee;
}
