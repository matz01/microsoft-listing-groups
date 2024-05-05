import fs from "fs";

export const createDirectory = (dir: string) => {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      return;
    }
    fs.mkdirSync(dir, { recursive: true });
};
