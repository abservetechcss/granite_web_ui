export interface IStorage {
    getPatientRecordRoot(userId: string, organisationId: string): any
    getDirectoryAndContent(storageId: string, organisationId: string): any
  }