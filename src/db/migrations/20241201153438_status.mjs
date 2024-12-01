export const up = async (db) => {
  await db.schema.createTable("status", (table) => {
    table.increments("id")
    table.text("label").notNullable()
    table.text("image").notNullable()
    table.text("color").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.dropTable("status")
}
