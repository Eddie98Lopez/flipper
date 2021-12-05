exports.up = async function (knex) {
  await knex.schema.createTable("statuses", (statuses) => {
    statuses.increments("status_id");
    statuses.string("status");

  });
  await knex.schema.createTable("images", (images) => {
    images.increments("image_id");
    images.string('name')
    images.binary("image").notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('images')
  await knex.schema.dropTableIfExists("statuses");
};
