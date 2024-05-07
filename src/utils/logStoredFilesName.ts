export const logStoredFilesName = (files: string[]) => {
  for(let i = 0; i < files.length; i ++){
    console.log(`${i+1} - ${files[i]}`);
  }
}
