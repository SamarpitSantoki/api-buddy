"use client";

import { HTMLInputTypeAttribute, useId } from "react";

type InputProps = {
  type: HTMLInputTypeAttribute;
  label: string;
  value: string;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input(props: InputProps) {
  const id = useId();
  return (
    // <input
    //   type={props.type}
    //   className={
    //     "relative m-0 -mr-0.5 flex-auto block w-[1px] min-w-max  rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-200 placeholder:text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-200 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary " +
    //     props.className
    //   }
    //   id={id}
    //   placeholder={props.placeholder}
    //   aria-label={props.label}
    //   value={props.value}
    //   onChange={props.onChange}
    // />
    <input
      type="text"
      placeholder="Search…"
      className={"input  input-bordered " + props.className}
      onChange={props.onChange}
      value={props.value}
    />
  );
}
export default Input;
