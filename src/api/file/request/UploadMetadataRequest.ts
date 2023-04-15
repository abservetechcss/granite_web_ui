export type UploadMetadataRequest = {
    type: string,
    userId: string,
    organisationId: string,
    parentId: string,
    key: string,
    iv: string,
    notes: string,
    categoryId: number,
    patientEpisodeId: number,
    diagnosis: string,
    consultant: string,
    billingCategory: string,
    episodeCreationDate: string,
    attachment: {
        encryptedSize: string,
        extension: string,
        id: string,
        iv: string,
        name: string,
        originalSize: string,
    }
}