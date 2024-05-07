import { getGroupsFromApi } from "./getGroupsFromApi";
import { createDirectory } from "./utils/createDirectory";
import { saveJsonFile } from "./utils/saveJsonFile";
import { logStoredFilesName } from "./utils/logStoredFilesName";
import {reportLog} from "./utils/reportLog";

const jsonFolder = "MSGraph/Groups";

export const listGroups = async () => {
  const saveFileInDir = saveJsonFile(jsonFolder);
  try {
    const groups = await getGroupsFromApi().then();
    createDirectory(jsonFolder);
    const savedFiles = groups.map(saveFileInDir).filter(Boolean);
    logStoredFilesName(savedFiles);
    reportLog(savedFiles, jsonFolder);
  } catch (e) {
    throw e;
  }
};


