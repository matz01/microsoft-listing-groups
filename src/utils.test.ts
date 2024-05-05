import fs from 'fs';


import { createDirectory } from "./utils";

describe('createDirectory', () => {
  let existsSyncSpy: any;
  let mkdirSyncSpy: any;

  beforeEach(() => {
    jest.resetModules(); // Resetta i moduli per assicurarti che gli spy siano puliti

    mkdirSyncSpy =  jest.spyOn(fs, 'mkdirSync').mockImplementation();
  });

  afterEach(() => {
    existsSyncSpy.mockRestore();
    mkdirSyncSpy.mockRestore();
  });

  it("should create a new directory if it does not exist", () => {
    existsSyncSpy =  jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    createDirectory("folderName");
    expect(mkdirSyncSpy).toHaveBeenCalledWith("folderName");
  });

  it("should not create a new directory if it does exist", () => {
    existsSyncSpy =  jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    createDirectory("folderName");
    expect(mkdirSyncSpy).not.toHaveBeenCalledWith("folderName");
  });
});
