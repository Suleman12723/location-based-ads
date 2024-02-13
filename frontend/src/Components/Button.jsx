import React from "react";

function Button(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      type={props.type || "button"}
      onClick={handleClick}
      style={props.style}
      disabled={props.loading}
      className="flex justify-center items-center rounded-2xl font-text bg-secondary text-white p-3 cursor-pointer"
    >
      {!props.loading ? (
        props.text
      ) : (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-l-2 border-white"></div>
        </div>
      )}
    </button>
  );
}

export default Button;
