import fs from "fs";

export const createDirectory = (dir: string) => {
    if (fs.existsSync(dir)) {
      return;
    }
    fs.mkdirSync(dir);
};
