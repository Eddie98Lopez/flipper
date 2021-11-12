
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {user_id: 1, username: 'testUser1', password:'test123!',first_name:'test', last_name: 'last', email:'test1@test.com'},
        {user_id: 2, username: 'testUser2', password:'test123!',first_name:'test', last_name: 'last', email:'test2@test.com'},
        {user_id: 3, username: 'testUser3', password:'test123!',first_name:'test', last_name: 'last', email:'test3@test.com'}
      ]);
    });
};
