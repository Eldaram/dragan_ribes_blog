export const up = async (db) => {
  await db.schema.dropTable("comments")
  await db.schema.dropTable("posts")
}

export const down = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title")
    table.text("content")
    table.integer("authorId").notNullable()
    table.timestamps(true, true, true)
    table.timestamp("deletedAt")
    table.foreign("authorId").references("id").inTable("users")
  })

  await db.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("content")
    table.integer("postId").notNullable()
    table.foreign("postId").references("id").inTable("posts")
    table.integer("authorId").notNullable()
    table.foreign("authorId").references("id").inTable("users")
    table.timestamps(true, true, true)
    table.timestamp("deletedAt")
  })
}
