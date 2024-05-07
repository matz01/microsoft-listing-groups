import fs from 'fs';


import {createDirectory} from "./createDirectory";

describe('createDirectory', () => {
  let existsSyncSpy: any;
  let mkdirSyncSpy: any;
  let rmSyncSpy: any;

  beforeEach(() => {
    jest.resetModules();
    rmSyncSpy = jest.spyOn(fs, 'rmSync').mockImplementation();
    mkdirSyncSpy =  jest.spyOn(fs, 'mkdirSync').mockImplementation();
  });

  afterEach(() => {
    existsSyncSpy.mockRestore();
    mkdirSyncSpy.mockRestore();
    rmSyncSpy.mockRestore();
  });

  it("should create a new directory if it does not exist", () => {
    existsSyncSpy =  jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    createDirectory("folderName");
    expect(mkdirSyncSpy).toHaveBeenCalledWith("folderName", {"recursive": true});
    expect(rmSyncSpy).not.toHaveBeenCalled();
  });

  it("should re-create the directory if it exists", () => {
    existsSyncSpy =  jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    createDirectory("folderName");
    expect(rmSyncSpy).toHaveBeenCalled();
  });
});
