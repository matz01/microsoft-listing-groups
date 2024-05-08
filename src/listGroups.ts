import { getGroupsFromApi } from "./utils/getGroupsFromApi";
import { createDirectory } from "./utils/createDirectory";
import { saveJsonFile } from "./utils/saveJsonFile";
import { filesNameOutput } from "./utils/filesNameOutput";
import {reportOutput} from "./utils/reportOutput";

const jsonFolder = "MSGraph/Groups";

export const listGroups = async (pagination = 0) => {
  const saveFileInDir = saveJsonFile(jsonFolder);
  try {
    const groups = await getGroupsFromApi().then();
    createDirectory(jsonFolder);
    const savedFiles = groups.map(saveFileInDir).filter(Boolean);
    reportOutput(savedFiles, jsonFolder);
    filesNameOutput(savedFiles, pagination);
  } catch (e) {
    throw e;
  }
};


