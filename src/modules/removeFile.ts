import { unlink } from "fs";

export function removeFile(pathToFile: string){
  unlink(pathToFile, (err) => {
    if (err) throw err;
  });
}