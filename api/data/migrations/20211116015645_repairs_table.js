exports.up = async function (knex) {


  await knex.schema.createTable("repairs", (repairs) => {
    repairs.increments("repair_id");
    repairs.string("title", 200).notNullable();
    repairs.string("description", 2000);
    repairs.boolean("completed").defaultTo(false);
    repairs.integer("cost");
    repairs
      .integer("home_id")
      .unsigned()
      .notNullable()
      .references("home_id")
      .inTable("homes")
      .onDelete("RESTRICT");
    repairs
      .integer("image_id")
      .unsigned()
      .notNullable()
      .references("image_id")
      .inTable("images")
      .onDelete("RESTRICT");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("repairs");

};
