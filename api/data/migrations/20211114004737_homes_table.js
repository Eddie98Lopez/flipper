exports.up = async function (knex) {
  await knex.schema.createTable("homes", (homes) => {
    homes.increments("home_id");
    homes.string("nickname", 200).notNullable();
    homes.string("address", 200).notNullable();
    homes.string("city", 200).notNullable();
    homes.integer("postal_code").notNullable();
    homes
      .integer("author_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    homes.string("notes", 1000);
    homes
      .integer("status_id")
      .unsigned()
      .notNullable()
      .defaultTo(1)
      .references("status_id")
      .inTable("statuses")
      .onDelete("CASCADE");
    homes.timestamps(false, true);
    homes.integer("purchase_price").nullable();
    homes.integer("sale_price").nullable();
    homes.integer("repair_estimate").nullable();
    homes
      .integer("cover_image")
      .unsigned()
      .nullable()
      .references("image_id")
      .inTable("images")
      .onDelete("RESTRICT");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("homes");
};
