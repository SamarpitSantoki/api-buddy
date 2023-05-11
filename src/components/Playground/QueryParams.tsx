import { useEffect, useReducer, useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import useKeyPress from "@/hooks/useKeyPress";

type RequestHeadersProps = {
  queryParams: Array<{ key: string; value: string }>;
  addQueryParam: () => void;
  onQueryParamChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    name: string
  ) => void;
  removeQueryParam: (index: number) => void;
};

const initialState = { selectedIndex: 0 };

function QueryParams({
  queryParams,
  addQueryParam,
  onQueryParamChange,
  removeQueryParam,
}: RequestHeadersProps) {
  return (
    <div className="flex flex-col gap-y-8 ">
      <div className="flex flex-col gap-y-4">
        {queryParams?.map((queryParam, index) => (
          <div className="flex gap-x-4" key={index}>
            <Input
              label="Key"
              type="text"
              placeholder="Key"
              onChange={(e) => {
                onQueryParamChange(e, index, "key");
              }}
              value={queryParam.key}
            />
            <Input
              label="Value"
              type="text"
              placeholder="Value"
              onChange={(e) => {
                onQueryParamChange(e, index, "value");
              }}
              value={queryParam.value}
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
