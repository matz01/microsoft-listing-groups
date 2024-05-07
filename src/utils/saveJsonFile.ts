import fs from "fs";
import path from "path";
import { fileNameByGroupData } from "./fileNameByGroupData";
import { Group } from "../types";

export const saveJsonFile = (group: Group, dir: string) => {
  try {
    const filePath = fileNameByGroupData(group);
    const fullPath = path.join(dir, `${filePath}.json`);
    if(fullPath && filePath?.length){
      fs.writeFile(fullPath, JSON.stringify(group, null, 4), () => {});
      return fullPath;
    }

  } catch (err) {
    console.log(`error: ${err}`);
    return false;
  }
};
