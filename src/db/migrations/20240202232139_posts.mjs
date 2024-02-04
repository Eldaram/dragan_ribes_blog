export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title")
    table.text("content")
    table.integer("authorId").notNullable()
    table.timestamps(true, true, true)
    table.timestamp("deletedAt")
    table.foreign("authorId").references("id").inTable("users")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}
