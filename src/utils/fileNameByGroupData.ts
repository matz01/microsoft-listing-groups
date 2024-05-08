import {Group} from "./types";

export const fileNameByGroupData = (group: Group): string => {
  try {
    return group.mailNickname ? group.mailNickname :
      `${group.displayName.toLowerCase().replace(/ +/g, "-")}.json`;
  } catch (e) {
    throw e;
  }
}

