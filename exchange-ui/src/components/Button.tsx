import React from "react";

function Button({
  children,
  btnStyle = {},
  handleClick,
  isDisabled = false,
}: {
  children: string;
  btnStyle?: React.CSSProperties | undefined;
  handleClick: Function;
  isDisabled?: boolean;
}) {
  return (
    <button
      style={
        isDisabled
          ? { backgroundColor: "#78716c", cursor: "not-allowed" }
          : { ...btnStyle }
      }
      className="bg-stone-900 rounded-3xl py-2 px-4"
      onClick={() => handleClick()}
      disabled={isDisabled}
    >
      <p className="text-stone-200">{children}</p>
    </button>
  );
}

function GreenButton({
  children,
  handleClick,
  isDisabled = false,
}: {
  children: string;
  handleClick: Function;
  isDisabled?: boolean;
}) {
  return (
    <Button
      btnStyle={{ backgroundColor: "#22c55e" }}
      handleClick={handleClick}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}

function RedButton({
  children,
  handleClick,
  isDisabled = false,
}: {
  children: string;
  handleClick: Function;
  isDisabled?: boolean;
}) {
  return (
    <Button
      btnStyle={{ backgroundColor: "#ef4444" }}
      handleClick={handleClick}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}

export { GreenButton, RedButton, Button };
