import fs from "fs";
import path from "path";
import { fileNameByGroupData } from "./fileNameByGroupData";
import { Group } from "./types";
import { error } from "./error";

export const saveJsonFile = (dir: string) => (group: Group) => {
  try {
    const filePath = fileNameByGroupData(group);
    const fullPath = path.join(dir, `${filePath}.json`);
    if (fullPath && filePath?.length) {
      fs.writeFile(fullPath, JSON.stringify(group, null, 4), () => {});
      return fullPath;
    }
  } catch (err) {
    error(`error: ${err}`);
    return false;
  }
};
