export const logStoredFilesName = (files: string[]) => {
  const filesWithoutNull = files.filter(Boolean);
  for(let i = 0; i < filesWithoutNull.length; i ++){
    console.log(`${i+1} - ${filesWithoutNull[i]}`);
  }
}
