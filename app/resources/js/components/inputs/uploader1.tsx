import { Button } from '@/components/ui/button';
import { useFileUpload } from '@/hooks/inputs/use-file-upload';

export default function Uploader1() {
  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({
    accept: 'image/*',
    maxFiles: 1,
    maxSize: 1024 * 1024, // 1MB
  });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  return (
    <div className="flex flex-col gap-2">
      <div className="inline-flex items-center gap-2 align-top">
        <div
          aria-label={previewUrl ? 'Upload preview' : 'Default user avatar'}
          className="border-input relative flex size-10 shrink-0 items-center justify-start overflow-hidden rounded-md border"
        >
          {previewUrl ? (
            <img alt="Upload preview" className="size-full object-cover" height={32} src={previewUrl} width={32} />
          ) : (
            <div aria-hidden="true" className="rounded-lg bg-zinc-200 py-1">
              <img src="/logo.png" alt="Favicon atual" className="size-9" />
            </div>
          )}
        </div>
        <div className="relative inline-block">
          <Button aria-haspopup="dialog" variant={'outline'} onClick={openFileDialog}>
            {fileName ? 'Trocar ícone' : 'Carregar Ícone'}
          </Button>
          <input {...getInputProps()} aria-label="Upload image file" className="sr-only" tabIndex={-1} />
        </div>
      </div>
      {fileName && (
        <div className="inline-flex gap-2 text-xs">
          <p aria-live="polite" className="text-muted-foreground truncate">
            {fileName}
          </p>{' '}
          <Button aria-label={`Remove ${fileName}`} variant={'destructive'} onClick={() => removeFile(files[0]?.id)}>
            Remover
          </Button>
        </div>
      )}
    </div>
  );
}
