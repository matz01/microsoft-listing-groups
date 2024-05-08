import {log} from "./log";

export const reportOutput = (savedFiles: string[], jsonFolder: string) => {
  log(
    `${savedFiles.length} groups stored in ${jsonFolder}`,
  );
  log("\n");
}
