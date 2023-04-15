import { injectable } from "inversify";
import JSZip from "jszip";
import { IExpand } from "./interface/IExpand";

@injectable()
class Unzip implements IExpand {

    unZipper = new JSZip();

    async expand(file: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const contents = await this.unZipper.loadAsync(file, {base64: true});
                console.log(contents);
                Object.keys(contents.files).forEach(async (filename) => {
                     const content = await this.unZipper.file(filename);
                     const blob = await content?.async('blob');
                     this.unZipper.remove(filename);
                     resolve({blob, filename});
                });
            }
            catch(error){
                reject(error);
            }
        })
    }


}

export default Unzip;