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
    // <select
    //   className={
    //     "form-select relative m-0 block w-[1px] min-w-0 flex-auto rounded-r border border-solid border-red-300 bg-transparent bg-clip-padding px-3 py-[0.25rem]  font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-red-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary " +
    //     props.className
    //   }
    //   multiple={props.multiple}
    //   data-te-select-init
    //   data-te-select-value={props.value}
    //   onChange={props.onChange}
    // >
    //   {props.options.map((option) => (
    //     <option key={option.value} value={option.value}>
    //       {option.label}
    //     </option>
    //   ))}
    // </select>

    <select
      className={"bg-secondary select select-md select-bordered prose"}
      multiple={props.multiple}
      onChange={props.onChange}
      defaultValue={props.value}
    >
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
export default PrimarySelect;
