const db = require("../data/db-config");

const getResources = (table) => {
  return db(table);
};

const getResourceById = (table, id) => {
  const table_id = `${table.slice(0, table.length - 1)}_id`;

  return db(table)
    .where({ [table_id]: id })
    .first();
};

const getResByFilter = (table, filter) => {
  return db(table).where(filter);
};

const addResource = async (table, resource) => {
  const table_id = `${table.slice(0, table.length - 1)}_id`;
  const [id] = await db(table).insert(resource).returning(table_id);
  return getResourceById(table, id);
};

module.exports = {getResources,getResByFilter, getResourceById, addResource}