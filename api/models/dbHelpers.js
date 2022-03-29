const res = require("express/lib/response");
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
 try{
   console.log(table)
   console.log(table_id)
  const [id] = await db(table).insert(resource).returning(table_id);
  const added = await getResourceById(table, id);
  return added
 }
 catch(error){
   res.status(500).json(`resource was not added to ${table} table`)
 }
};

module.exports = {getResources,getResByFilter, getResourceById, addResource}