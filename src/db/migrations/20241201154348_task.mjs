export const up = async (db) => {
  await db.schema.createTable("task", (table) => {
    table.increments("id")
    table.text("task_name").notNullable()
    table.text("body")
    table.foreign("user_id").references("id").inTable("users")
    table.integer("user_id").notNullable()
    table.foreign("priority_id").references("id").inTable("priority")
    table.integer("priority_id").notNullable()
    table.foreign("status_id").references("id").inTable("status")
    table.integer("status_id").notNullable()
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("task")
}
