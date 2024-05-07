import fs from "fs";
import path from "path";
import { fileNameByGroupData } from "./fileNameByGroupData";
import { Group } from "../types";

export const saveJsonFile = (group: Group, dir: string) => {
  const filePath = fileNameByGroupData(group);
  const fullPath = path.join(dir, `${filePath}.json`);

  try {
    fs.writeFile(fullPath, JSON.stringify(group, null, 4), (err: any) => {
      console.error(err);
    });
    return fullPath;
  } catch (err) {
    console.log(`error: ${err}`);
  }
};
