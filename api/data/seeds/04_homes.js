
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('homes').del()
    .then(function () {
      // Inserts seed entries
      return knex('homes').insert([
        {home_id: 1, address: '1080 W Escalon', nickname: 'Bullard', postal_code: 93721, city:'Fresno', author_id:1},
        {home_id: 2, address: '1458 E Divisadero', nickname: 'Divisadero', postal_code: 93711, city:'Fresno', author_id:1},
      ]);
    });
};
