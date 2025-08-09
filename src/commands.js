import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { newNote } from "./noteController.js";

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
  .option("tags", {
    describe: "A list of tags for the provided note",
    type: "string",
    alias: "t",
  })
  .demandCommand(1)
  .demandOption("tags")
  .parse();
