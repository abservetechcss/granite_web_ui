import { injectable } from "inversify";
import JSZip from "jszip";
import { ICompression } from "./interface/ICompression";

@injectable()
class Zip implements ICompression {

  zipper = new JSZip();

compress(fileName: File): Promise<string> {
    return new Promise( async (resolve, reject) =>  {
      try {

           const reader = new FileReader();
           let content: ArrayBuffer;
          
           reader.readAsArrayBuffer(fileName);
           reader.onload = async (e) => {
             if(reader.result != null)
               content = reader.result as ArrayBuffer;
               
               const zip = new JSZip()
               console.log(fileName)
               zip.file(fileName.name, content);
               const fileBuffer = await zip.generateAsync({type: 'base64',
                                                           compression: "DEFLATE",
                                                           compressionOptions: {
                                                            level: 6
                                                        }})
               resolve(fileBuffer)
           }
      }
      catch(error){
        reject(error);
      }
    })
  }
}

export default Zip;