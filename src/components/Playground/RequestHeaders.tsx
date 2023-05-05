import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

type RequestHeadersProps = {
  requestHeaders: Array<{ key: string; value: string }>;
  addRequestHeaders: () => void;
  onRequestHeadersChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => void;
  removeRequestHeaders: (index: number) => void;
};

function RequestHeaders({
  requestHeaders,
  addRequestHeaders,
  onRequestHeadersChange,
  removeRequestHeaders,
}: RequestHeadersProps) {
  return (
    <div className="flex flex-col gap-y-8 ">
      <div className="flex flex-col gap-y-4">
        {requestHeaders?.map((queryParam, index) => (
          <div className="flex gap-x-4" key={index}>
            <Input
              label="Key"
              type="text"
              placeholder="Key"
              onChange={(e) => {
                onRequestHeadersChange(e, index, "key");
              }}
              value={queryParam.key}
            />
            <Input
              label="Value"
              type="text"
              placeholder="Value"
              onChange={(e) => {
                onRequestHeadersChange(e, index, "value");
              }}
              value={queryParam.value}
            />
            <Button
              label="Remove"
              onClick={() => removeRequestHeaders(index)}
            />
          </div>
        ))}
      </div>
      <div>
        <Button label="Add" onClick={addRequestHeaders} />
      </div>
    </div>
  );
}
export default RequestHeaders;
