exports.up = function (knex) {
  return knex.schema
    .createTable("products", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("product_name").notNullable();
      table.string("image").notNullable();
      table.string("type").notNullable();
      table.integer("price").notNullable();
      table.string("size").notNullable();
      table.integer("quantity").defaultTo(0);
      table.string("description").notNullable();
      table.string("category").notNullable();
      table.timestamp("create_at").defaultTo(knex.fn.now());
    })
    .createTable("reviews", (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("(UUID())"));
      table.string("username").notNullable();
      table.string("review").notNullable();
      table.timestamp("create_at").defaultTo(knex.fn.now());
      table
        .uuid("products_id")
        .defaultTo(knex.raw("(UUID())"))
        .references("id")
        .inTable("products");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products").dropTable("reviews");
};
