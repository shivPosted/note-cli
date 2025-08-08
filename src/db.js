import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

const getDB = async () => {
  try {
    const db = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(db);
  } catch (error) {
    console.error(error.message);
  }
};

const insertDB = async (newObj) => {
  try {
    const db = await getDB();
    db.notes.push(newObj);
    await fs.writeFile(DB_PATH, JSON.stringify(db));
    return newObj;
  } catch (error) {
    console.error(error.message);
  }
};

const saveDB = async (db) => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 4));
    return db;
  } catch (error) {
    console.error(error.message);
  }
};
export { getDB, insertDB, saveDB };
