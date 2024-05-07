import {log} from "./log";

export const reportLog = (savedFiles: string[], jsonFolder: string) => {
  log("\n");
  log(
    `${savedFiles.length} groups stored in ${jsonFolder}`,
  );
}
