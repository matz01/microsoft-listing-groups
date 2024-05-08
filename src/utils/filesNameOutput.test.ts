import { filesNameOutput, paginate } from "./filesNameOutput";
import * as logModule from "./log";

let log: any;

describe("filesNameOutput", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    log = jest.spyOn(logModule, "log").mockImplementation((msg: string) => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should log each file name with an index", () => {
    const mockFiles = ["file1", "file2", "file3"];
    filesNameOutput(mockFiles);
    expect(log).toHaveBeenCalledWith("1 - file1");
    expect(log).toHaveBeenCalledWith("2 - file2");
    expect(log).toHaveBeenCalledWith("3 - file3");
  });

  it("should ignore null or undefined file names", () => {
    const mockFiles = ["file1", undefined, "file2", undefined, "file3"];
    filesNameOutput(mockFiles);
    expect(log).toHaveBeenCalledWith("1 - file1");
    expect(log).toHaveBeenCalledWith("2 - file2");
    expect(log).toHaveBeenCalledWith("3 - file3");
  });

  it("should not log anything if no file names are provided", () => {
    const mockFiles: string[] = [];
    filesNameOutput(mockFiles);
    expect(log).not.toHaveBeenCalled();
  });

  it("should paginate", () => {
    const mockFiles = new Array(100).fill("file");
    filesNameOutput(mockFiles, 10);
    expect(log).toHaveBeenCalledTimes(10);
  });
  it("should log the correct number of files per page", () => {
    const mockFiles = ["file1", "file2", "file3", "file4", "file5"];
    paginate(mockFiles, 2, 0);
    expect(log).toHaveBeenCalledWith("file1");
    expect(log).toHaveBeenCalledWith("file2");
  });

  it("should not paginate if the number of files is less than the pagination number", () => {
    const mockFiles = ["file1", "file2", "file3"];
    paginate(mockFiles, 5, 0);
    expect(log).toHaveBeenCalledWith("file1");
    expect(log).toHaveBeenCalledWith("file2");
    expect(log).toHaveBeenCalledWith("file3");
  });
});
