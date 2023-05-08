"use client";

type GroupButtonProps = {
  label: string;
  onClick: () => void;
};

function GroupButton(props: GroupButtonProps) {
  return (
    <button className="btn btn-secondary" onClick={props.onClick}>
      {props.label}
    </button>
  );
}
export default GroupButton;
