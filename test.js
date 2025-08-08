import fs from "node:fs/promises";

const readJson = async () => {
  try {
    const jsonAPath = new URL("./package.json", import.meta.url).pathname;
    console.log(JSON.parse(await fs.readFile(jsonAPath, "utf8")));
  } catch (error) {
    console.error(error.message);
  }
};

const writeFile = async () => {
  try {
    const newFile = new URL("./demo.js", import.meta.url).pathname;
    await fs.writeFile(newFile, `console.log('Hello from demo')`);
    console.log("file created successfully");
  } catch (error) {
    console.error(error.message);
  }
};
writeFile();
