exports.up = async function (knex) {
  await knex.schema.createTable("homes", (homes) => {
    homes.increments("home_id");
    homes.string("nickname", 200).notNullable();
    homes.string("address", 200).notNullable();
    homes.string("city", 200).notNullable();
    homes.integer("postal_code").notNullable();
    homes.string("notes");
    homes
      .integer("status_id")
      .references("status_id")
      .inTable("statuses")
      .defaultTo(1);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("homes");
};
