export interface ICompression {
    compress(fileName: File): Promise<string>;
  }