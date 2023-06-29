import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';

interface CreateDialogProps {
  triggerElement: React.ReactNode;
  header: string | React.ReactNode;
  contentElement: React.ReactNode;
}

function CreateDialog({
  triggerElement,
  header,
  contentElement,
}: CreateDialogProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-auto h-auto">{triggerElement}</DialogTrigger>
      <DialogContent>
        <DialogHeader>{header}</DialogHeader>
        {contentElement}
      </DialogContent>
    </Dialog>
  );
}
export default CreateDialog;
