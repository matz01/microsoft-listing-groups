import { log } from "./log";
import readline from "node:readline";

const logFiles = (files: string[]) => {
  for (let i = 0; i < files.length; i++) {
    log(files[i]);
  }
};

export const paginate = (files: string[], pagination: number, page: number) => {
  if (pagination ) {
    const filesToDisplay = files.slice(
      pagination * page,
      pagination * (page + 1),
    );

    logFiles(filesToDisplay);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    if(files.length <= pagination * (page + 1)) {
      rl.question(`\nNo more files, press ENTER to exit`, (name) => {
        rl.close();
      });
      return;
    }
    rl.question(`\nENTER for next page\n`, (name) => {
      rl.close();
      paginate(files, pagination, page + 1);
    });
  }
}

export const filesNameOutput = (
  files: (string | undefined)[],
  pagination = 0,
  page = 0,
) => {
  const filesWithoutNull = files
    .filter(Boolean)
    .map((name, index) => `${index + 1} - ${name}`);

  if (!pagination || filesWithoutNull.length <= pagination) {
    logFiles(filesWithoutNull);
    return;
  }

  paginate(filesWithoutNull, pagination, page);

};
