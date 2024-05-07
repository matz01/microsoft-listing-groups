import { getGroupsFromApi } from "./getGroupsFromApi";
import { createDirectory } from "./utils/createDirectory";
import { saveJsonFile } from "./utils/saveJsonFile";
import { logStoredFilesName } from "./utils/logStoredFilesName";

const jsonFolder = "MSGraph/Groups";

export const listGroups = async () => {
  const saveFileInDir = saveJsonFile(jsonFolder);
  try {
    const groups = await getGroupsFromApi().then();
    if (!groups.length) {
      console.log("No groups found");
      return;
    }
    createDirectory(jsonFolder);

    const resultsWithoutUndefined = groups.map(saveFileInDir).filter(Boolean);
    logStoredFilesName(resultsWithoutUndefined);
    console.log("\n");
    console.log(
      `${resultsWithoutUndefined.length} groups stored in ${jsonFolder}`,
    );
  } catch (e) {
    throw e;
  }
};


