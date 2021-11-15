exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("statuses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("statuses").insert([
        { status_id: 1, status: "Prospective" },
        { status_id: 2, status: "Renovating" },
        { status_id: 3, status: "Listed" },
        { status_id: 4, status: "Sold" },
      ]);
    });
};
