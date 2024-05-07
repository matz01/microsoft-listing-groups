import {log} from "./log";

export const logStoredFilesName = (files: string[]) => {
  const filesWithoutNull = files.filter(Boolean);
  for(let i = 0; i < filesWithoutNull.length; i ++){
    log(`${i+1} - ${filesWithoutNull[i]}`);
  }
}
