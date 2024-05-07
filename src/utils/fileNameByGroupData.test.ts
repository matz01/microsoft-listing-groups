import {fileNameByGroupData} from "./fileNameByGroupData";
import { mock } from "ts-jest-mocker";
import {Group} from "../types";

describe("convertDisplayNameToFileName", () => {
  const myGroup = mock<Group>();

  it("should use mailNickName", () => {
    const res = fileNameByGroupData({
      ...myGroup,
      mailNickname: "file-name",
      displayName: "Name of the file",
    });
    expect(res).toEqual("file-name");
  });
  it("should use display name if mailNickName is missing", () => {
    const res = fileNameByGroupData({
      ...myGroup,
      displayName: "Name of the file",
    });
    expect(res).toEqual("name-of-the-file.json");
  });

  it("should convert multiple spaces into a single dash", () => {
    const res = fileNameByGroupData({
      ...myGroup,
      displayName: "Name    of the file",
    });
    expect(res).toEqual("name-of-the-file.json");
  });
});
