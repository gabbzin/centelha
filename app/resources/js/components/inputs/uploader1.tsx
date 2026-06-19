import { Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  type FileWithPreview,
  useFileUpload,
} from '@/hooks/inputs/use-file-upload'

interface Uploader1Props {
  onFilesChange?: (files: FileWithPreview[]) => void
}
export default function Uploader1({ onFilesChange }: Uploader1Props) {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: 'image/*',
      maxFiles: 1,
      maxSize: 1024 * 1024,
      // 1MB
      onFilesChange,
    })
  const previewUrl = files[0]?.preview || null
  const fileName = files[0]?.file.name || null
  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          aria-label={previewUrl ? 'Upload preview' : 'Default user avatar'}
          className="border-input relative flex size-10 shrink-0 items-center justify-start overflow-hidden rounded-md border"
        >
          {previewUrl ? (
            <img
              alt="Upload preview"
              className="size-full object-cover"
              height={32}
              src={previewUrl}
              width={32}
            />
          ) : (
            <div aria-hidden="true" className="rounded-lg bg-zinc-200 py-1">
              <img alt="Favicon atual" className="size-9" src="/logo.png" />
            </div>
          )}
        </div>
        <div className="relative inline-flex items-center gap-2">
          <Button
            aria-haspopup="dialog"
            onClick={openFileDialog}
            variant={'outline'}
          >
            {fileName ? 'Trocar ícone' : 'Carregar Ícone'}
          </Button>
          <input
            {...getInputProps()}
            aria-label="Upload image file"
            className="sr-only"
            tabIndex={-1}
          />
          {fileName && (
            <div className="inline-flex text-xs">
              <Button
                aria-label={`Remove ${fileName}`}
                onClick={() => removeFile(files[0]?.id)}
                size={'icon-lg'}
                variant={'destructive'}
              >
                <Trash2Icon />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
