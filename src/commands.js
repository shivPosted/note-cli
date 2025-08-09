import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findNotes, getAllNotes, newNote } from "./noteController.js";
import { displayNotesList } from "./utils.js";

const cli = yargs(hideBin(process.argv));

cli
  .command(
    "new <note>", //<..> defines required after the command and is positional argument
    "Create a new note",
    (yargs) =>
      yargs.positional("note", {
        //positional is used to build the thing included in <..>
        describe: "Content of the new note provided",
        type: "string",
      }),
    async (argv) => {
      const tags = argv.tags
        ? argv.tags.split(",").map((tag) => tag.trim())
        : [];
      const note = argv.note;
      const addedNote = await newNote(note, tags);
      if (addedNote) console.log(`Note added successfull: ${addedNote}`);
      else console.error("Could not add note");
    },
  )
  .command(
    "all",
    "get all notes",
    () => {},
    async () => {
      const allNotes = await getAllNotes();
      displayNotesList(allNotes);
    },
  )
  .command(
    "find <filter>",
    "search for notes in your list of notes",
    (yargs) => {
      yargs.positional("filter", {
        describe:
          "the search term to filter notes by, it will match the notes based on the passed term and see if the term is inculded in the content",
        type: "string",
      });
    },
    async (argv) => {
      const foundNotes = await findNotes(argv.filter);
      displayNotesList(foundNotes, "filtered");
    },
  )
  .option("tags", {
    describe: "A list of tags for the provided note",
    type: "string",
    alias: "t",
  })
  .demandCommand(1)
  .parse();
