import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

function QueryParams() {
  const [queryParams, setQueryParams] = useState<
    Array<{ key: string; value: string }>
  >([]);

  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  const removeQueryParam = (index: number) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };

  function onChange() {}
  return (
    <div className="flex flex-col gap-y-8 ">
      <div className="flex flex-col gap-y-4">
        {queryParams.map((queryParam, index) => (
          <div className="flex gap-x-4" key={index}>
            <Input
              label="Key"
              type="text"
              placeholder="Key"
              onChange={onChange}
              value=""
            />
            <Input
              label="Value"
              type="text"
              placeholder="Value"
              onChange={onChange}
              value=""
            />
            <Button label="Remove" onClick={() => removeQueryParam(index)} />
          </div>
        ))}
      </div>
      <div>
        <Button label="Add" onClick={addQueryParam} />
      </div>
    </div>
  );
}
export default QueryParams;
