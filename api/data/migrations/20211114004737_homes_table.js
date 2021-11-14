
exports.up = async function(knex) {
  await knex.schema.createTable('homes',(homes)=>{
    homes.increments('home_id')
    homes.string('address',200).notNullable()
    homes.integer('postal_code').notNullable()
    homes.string('nickname',200).notNullable()
    homes.string('notes')
    homes.integer('status_id').reference('status_id').inTable('statuses').defaultTo(1)
    homes.string('city',200).notNullable()

})
};

exports.down = async function(knex) {
  await knex.dropTableIfExists('homes')
};
