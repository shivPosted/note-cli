const displayNotesList = (notes) => {
  console.log("Here are your all notes:");
  notes.forEach((note, i) => {
    console.log("\n", i + 1, ` \tnote: ${note.description}`);
    console.log(` \tid: ${note.id}`);
    console.log(` \ttags: ${note.tags.join(", ")}`);
  });
};

export { displayNotesList };
