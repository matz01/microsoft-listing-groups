import { createDirectory } from "./utils";
import { getGroupsFromApi } from "./getGroupsFromApi";

const jsonFolder = "MSGraph/Groups";

export const listGroups = async () => {
  try {
    const result = await getGroupsFromApi();
    if (result !== undefined) {
      createDirectory(jsonFolder);
    }
  } catch (e) {
    throw e;
  }
};

listGroups()
  .then(() => console.log("process completed"))
  .catch((e) => console.error(e));
