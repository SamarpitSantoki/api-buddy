import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface IkpProps {
  fields: {
    key: string;
    value: string;
  }[];
  addField: () => void;
  removeField: (index: number) => void;
  updateField: (index: number, key: string, value: string) => void;
}

function HeaderTab({ fields, addField, removeField, updateField }: IkpProps) {
  return (
    <div className="border rounded-md border-accent h-80">
      {fields.map((field, index) => (
        <div key={index} className="flex p-2 ">
          <Input
            className="w-full rounded-none"
            placeholder="Key"
            value={field.key}
            onChange={(e) => {
              updateField(index, e.target.value, field.value);
            }}
          />
          <Input
            className="w-full border-l-0 rounded-none"
            placeholder="Value"
            value={field.value}
            onChange={(e) => {
              updateField(index, field.key, e.target.value);
            }}
          />
          <Button className="w-20 ml-1 " variant="destructive">
            Remove
          </Button>
        </div>
      ))}

      <Button className="w-full" variant="secondary" onClick={addField}>
        Add Field
      </Button>
    </div>
  );
}
export default HeaderTab;
