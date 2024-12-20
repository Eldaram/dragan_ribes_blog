export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.string("userName").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("userName")
  })
}
