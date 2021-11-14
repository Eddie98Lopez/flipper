exports.up = async function (knex) {
  await knex.schema.createTable("statuses", (statuses) => {
    statuses.increments("status_id");
    statuses.string("status");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("statuses");
};
