import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
interface AlertButtonProps {
  textButton: string;
  iconButton: React.ReactNode;
  title: string;
  description: string;
  actionText: string;
  cancelText: string;
  onAction: () => void;
}
export function AlertButton({
  textButton,
  iconButton,
  title,
  description,
  actionText,
  cancelText,
  onAction,
}: AlertButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={(props) => (
          <Button {...props} variant={'destructive'}>
            {iconButton}
            {textButton}
          </Button>
        )}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant={'outline'}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAction} variant={'primary'}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
