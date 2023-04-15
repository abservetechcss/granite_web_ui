import { UploadMetadataRequest } from "../request/UploadMetadataRequest"

export interface IFile {
    getTemporaryLinkForUpload(bucketId: string): any
    getTemporaryLinkForDownload(bucketId: string, fileId: string): any
    uploadFileToStore(URL: string, content: string): any
    getFileFromStore(URL: string, encryptedLength: string): any
    uploadMetadataToStore(request: UploadMetadataRequest ): any
  }