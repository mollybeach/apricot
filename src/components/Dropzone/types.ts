import { FileError } from 'react-dropzone';

type FileType = {
  file: File;
  onDelete: (file: File) => void;
};

export interface DropzoneProps {
  supportedFormats?: string[];
  supportedFormatLabel?: string;
  maxFileSize?: number;
  uploadedFiles: (files: UploadableFile[]) => void;
  isUpload?: any;
}

export interface UploadableFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
}

export interface UploadErrorProps extends FileType {
  errors: FileError[];
}

export interface UploadProgressProps extends FileType {
  children: React.ReactNode;
}

export interface UploadSuccessProps extends FileType {
  onUpload: (file: File, url: string) => void;
}
