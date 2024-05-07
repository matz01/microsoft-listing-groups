import { getGroupsFromApi } from "./getGroupsFromApi";
import {createDirectory} from "./utils/createDirectory";
import {saveJsonFile} from "./utils/saveJsonFile";
import {Group} from "./types";

const jsonFolder = "MSGraph/Groups";

export const listGroups = async () => {
  try {
    const groups = await getGroupsFromApi();
    if (!groups.length) {
      console.log("No groups found");
      return;
    }
    createDirectory(jsonFolder);
    const results = groups.map((group: Group) => saveJsonFile(group, jsonFolder));
    console.log(results)
    console.log(`${results.length} groups stored in ${jsonFolder}`);
  } catch (e) {
    throw e;
  }
};

listGroups()
  .then(() => console.log("process completed"))
  .catch((e) => console.error(e));
