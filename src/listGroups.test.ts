import * as getGroupsFromApiModule from "./getGroupsFromApi";
import * as saveJsonFileModule from "./utils/saveJsonFile";
import { listGroups } from "./listGroups";
import fs from "fs";
import { mock } from "ts-jest-mocker";
import { Group } from "./types";

jest.mock("@azure/identity", () => {
  return {
    ClientSecretCredential: jest.fn().mockImplementation(() => {
      return {
        getToken: jest.fn().mockResolvedValue({
          token: "mocked-token",
          expiresOnTimestamp: Date.now() + 3600 * 1000, // a future timestamp
        }),
      };
    }),
  };
});

describe("listGroups", () => {
  let existsSyncSpy: any;
  let mkdirSyncSpy: any;
  let rmSyncSpy: any;
  beforeEach(() => {
    jest.resetModules();
    existsSyncSpy = jest.spyOn(fs, "existsSync").mockImplementation();
    mkdirSyncSpy = jest.spyOn(fs, "mkdirSync").mockImplementation();
    rmSyncSpy = jest.spyOn(fs, "rmSync").mockImplementation();
  });
  afterEach(() => {
    existsSyncSpy.mockRestore();
    mkdirSyncSpy.mockRestore();
    rmSyncSpy.mockRestore();
  });
  it("should handle an error", async () => {
    jest
      .spyOn(getGroupsFromApiModule, "getGroupsFromApi")
      .mockImplementation(() => Promise.reject(new Error("123")));
    await expect(listGroups()).rejects.toThrow("123");
  });

  it("should handle the response and call the method save json for each group", async () => {
    const myGroup = mock<Group>();
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    jest
      .spyOn(getGroupsFromApiModule, "getGroupsFromApi")
      .mockImplementation(() =>
        Promise.resolve([
          {
            ...myGroup,
            mailNickname: "file-name-a",
          },
          {
            ...myGroup,
            mailNickname: "file-name-b",
          },
        ]),
      );
    const saveJsonFileSpy = jest.spyOn(saveJsonFileModule, "saveJsonFile");
    await listGroups();
    expect(saveJsonFileSpy).toHaveBeenCalledTimes(2);
    expect(log.mock.calls[0][0]).toEqual(
      "1 - MSGraph/Groups/file-name-a.json",
    );
    expect(log.mock.calls[1][0]).toEqual(
      "2 - MSGraph/Groups/file-name-b.json",
    );
    expect(log.mock.calls[3][0]).toEqual('2 groups stored in MSGraph/Groups');
  });

  it("should handle errors", async () => {
    const myGroup = mock<Group>();
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    jest
      .spyOn(getGroupsFromApiModule, "getGroupsFromApi")
      .mockImplementation(() =>
        Promise.resolve([
          {
            ...myGroup,
            mailNickname: undefined,
            displayName: undefined,

          },
          {
            ...myGroup,
            mailNickname: "file-name-b",
          },
        ]),
      );
    const saveJsonFileSpy = jest.spyOn(saveJsonFileModule, "saveJsonFile");
    await listGroups();
    expect(saveJsonFileSpy).toHaveBeenCalledTimes(2);
    expect(log.mock.calls[0][0]).toEqual("error: TypeError: Cannot read properties of undefined (reading 'toLowerCase')");
    expect(log.mock.calls[1][0]).toEqual(
      "1 - MSGraph/Groups/file-name-b.json",
    );
    expect(log.mock.calls[3][0]).toEqual('1 groups stored in MSGraph/Groups');
  });
});
