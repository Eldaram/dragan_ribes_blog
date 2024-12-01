export const up = async (db) => {
  await db.schema.createTable("subtask", (table) => {
    table.foreign("id_parent").references("id").inTable("task")
    table.integer("id_parent").notNullable()
    table.foreign("id_children").references("id").inTable("task")
    table.integer("id_children").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.dropTable("subtask")
}
