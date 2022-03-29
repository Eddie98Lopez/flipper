
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'testUser1', password:'test123!',first_name:'test', last_name: 'last', email:'test1@test.com'},
        { username: 'testUser2', password:'test123!',first_name:'test', last_name: 'last', email:'test2@test.com'},
        { username: 'testUser3', password:'test123!',first_name:'test', last_name: 'last', email:'test3@test.com'}
      ]);
    });
};
