import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

function CreateDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">Create API</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Create API</DialogHeader>
        <div className="flex flex-col">
          <label className="text-sm">Title</label>
          <input
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            type="text"
          />
          <label className="text-sm">Description</label>
          <textarea
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            rows={3}
          />
          <Button className="w-full">Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default CreateDialog;
