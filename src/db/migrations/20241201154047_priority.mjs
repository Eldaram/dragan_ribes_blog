export const up = async (db) => {
  await db.schema.createTable("priority", (table) => {
    table.increments("id")
    table.text("label").notNullable()
    table.text("image").notNullable()
    table.integer("value").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.dropTable("priority")
}
