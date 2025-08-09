import { getDB, insertDB, saveDB } from "./db.js";

const removeNote = async (id) => {
  if (!id) console.error("Provide a valid id");
  const db = await getDB();
  if (!db) console.error("Could not remove that note");
  db.notes = db.notes.filter((note) => note.id !== id);
  await saveDB(db);
  return id;
};

const removeAllNote = () => saveDB({ notes: [] });

const findNotes = async (filter) => {
  const { notes } = await getDB();
  if (!notes) console.error("Could not get the notes");
  const foundNotes = notes.filter(
    (note) => note.description.toLowerCase() === filter.toLowerCase(),
  );
  if (foundNotes.length) return foundNotes;
  else return "No note found by that filter";
};

const newNote = async (noteDesc, tags) => {
  const newNote = {
    tags,
    description: noteDesc,
    id: Date.now(),
  };
  const note = await insertDB(newNote);
  return note;
};

const getAllNotes = async () => {
  const { notes } = await getDB();
  return notes;
};
export { getAllNotes, newNote, findNotes, removeAllNote, removeNote };
