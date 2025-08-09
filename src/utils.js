const displayNotesList = (notes, filter = "all") => {
  console.log();
  console.log(`Here are your ${filter}  notes:`);
  notes.forEach((note, i) => {
    console.log("\n", i + 1, ` \tnote: ${note.description}`);
    console.log(` \tid: ${note.id}`);
    console.log(` \ttags: ${note.tags.join(", ")}`);
  });
};

export { displayNotesList };
