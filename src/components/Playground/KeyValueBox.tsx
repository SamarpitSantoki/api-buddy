import { useEffect } from "react";
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
  disabled?: boolean;
}

function KeyValuBox({
  fields,
  addField,
  removeField,
  updateField,
  disabled,
}: IkpProps) {
  useEffect(() => {
    // check if the last field is empty
    if (!!fields) {
      const lastField = fields[fields.length - 1];

      if (fields.length === 0) {
        addField();
      } else if (lastField.key !== "" || lastField.value !== "") {
        addField();
      }
    } else {
      addField();
    }
  }, [fields]);

  return (
    <div className="relative border rounded-md border-accent min-h-[120px]">
      {fields?.map((field, index) => (
        <div key={index} className="flex p-2 ">
          <Input
            disabled={disabled}
            className="w-full rounded-none focus-visible:ring-offset-0"
            placeholder="Key"
            value={field.key}
            onChange={(e) => {
              updateField(index, e.target.value, field.value);
            }}
          />
          <Input
            disabled={disabled}
            className="w-full border-l-0 rounded-none focus-visible:ring-offset-0"
            placeholder="Value"
            value={field.value}
            onChange={(e) => {
              updateField(index, field.key, e.target.value);
            }}
          />
          {!disabled && (
            <Button
              className="w-20 ml-1 hover:bg-red-500 hover:text-white "
              variant="destructive"
              onClick={() => {
                removeField(index);
              }}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
export default KeyValuBox;
