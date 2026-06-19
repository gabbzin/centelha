import { Button } from '@/components/ui/button';
import {
  useFileUpload,
  type FileWithPreview,
} from '@/hooks/inputs/use-file-upload';
import { convertMB } from '@/utils/convertMb';
import {
  AlertCircleIcon,
  CloudUploadIcon,
  UploadIcon,
  XIcon,
} from 'lucide-react';
import { Label } from '../ui/label';
interface Uploader2Props {
  onFilesChange?: (files: FileWithPreview[]) => void;
}
export default function Uploader2({ onFilesChange }: Uploader2Props) {
  const maxSize = convertMB(2);
  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: 'image/svg+xml,image/png,image/jpeg,image/jpg,image/gif',
    maxSize,
    onFilesChange,
  });
  const previewUrl = files[0]?.preview || null;
  return (
    <div className="flex flex-col gap-2">
      <Label>Logo da plataforma</Label>
      <div className="relative">
        <div
          className="border-border has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 data-[dragging=true]:bg-accent/50 relative flex min-h-24 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-11 transition-colors has-[input:focus]:ring-[3px]"
          data-dragging={isDragging || undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            {...getInputProps()}
            aria-label="Upload image file"
            className="sr-only"
          />
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                alt={files[0]?.file?.name || 'Uploaded image'}
                className="mx-auto max-h-full rounded object-contain"
                src={previewUrl}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                aria-hidden="true"
                className="mb-2 flex size-11 shrink-0 items-center justify-center bg-transparent"
              >
                <CloudUploadIcon className="size-8 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">
                Arraste uma imagem ou clique para selecionar
              </p>
              <Button
                className="mt-2"
                onClick={openFileDialog}
                variant="outline"
              >
                <UploadIcon
                  aria-hidden="true"
                  className="-ms-1 size-4 opacity-60"
                />
                Selecionar arquivo
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <Button
              aria-label="Remove image"
              onClick={() => removeFile(files[0]?.id)}
              size={'icon'}
              variant={'destructive'}
            >
              <XIcon aria-hidden="true" className="size-4" />
            </Button>
          </div>
        )}
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
