exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("statuses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("statuses").insert([
        { status_id: 1, status: "Prospective" },
        { status_id: 2, status: "First Contact" },
        { status_id: 3, status: "Negotiation" },
        { status_id: 4, status: "Bought" },
        { status_id: 5, status: "Renovating" },
        { status_id: 6, status: "Listed" },
        { status_id: 7, status: "Sold" },
      ]);
    });
};
