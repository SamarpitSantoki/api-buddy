"use client";
import { useEffect } from "react";
import { Select, initTE } from "tw-elements";

type PrimarySelectProps = {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function PrimarySelect(props: PrimarySelectProps) {
  useEffect(() => {
    initTE({ Select });
  }, []);
  return (
    <>
      <select
        className={props.className}
        multiple={props.multiple}
        data-te-select-init
        data-te-select-value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label data-te-select-label-ref>{props.label}</label>
    </>
  );
}
export default PrimarySelect;
