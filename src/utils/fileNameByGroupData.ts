import {Group} from "../types";

export const fileNameByGroupData = (group: Group) =>
  group.mailNickname ? group.mailNickname :
    `${group.displayName.toLowerCase().replace(/ +/g, "-")}.json`;
