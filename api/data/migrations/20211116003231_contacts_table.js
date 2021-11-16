exports.up = async function (knex) {
  await knex.schema.createTable("contacts", (contacts) => {
    contacts.increments("contact_id");
    contacts
      .integer("home_id")
      .unsigned()
      .notNullable()
      .references("home_id")
      .inTable("homes")
      .onDelete("CASCADE");
    contacts.string("first", 200).notNullable();
    contacts.string("last", 200).nullable();
    contacts.string("phone", 10);
    contacts.string("email", 200);
    contacts.string("mail_address", 200);
    contacts.string("notes", 1000);
  });

  await knex.schema.createTable("contact_log", (cLog) => {
    cLog.increments("c_log_id");
    cLog
      .integer("home_id")
      .unsigned()
      .notNullable()
      .references("home_id")
      .inTable("homes")
      .onDelete("RESTRICT");
    cLog
      .integer("contact_id")
      .unsigned()
      .notNullable()
      .references("contact_id")
      .inTable("contacts")
      .onDelete("RESTRICT");
    cLog
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onDelete("RESTRICT");
    cLog.string("notes", 1000);
    cLog.timestamps(false, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("contact_log");
  await knex.schema.dropTableIfExists("contacts");
};
