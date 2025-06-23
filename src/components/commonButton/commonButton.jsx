const CommonButton = ({ label, children, className, ...rest }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 border-blue-500 p-2 rounded cursor-pointer ${
        rest.isSelected === rest.value
          ? "bg-blue-500 text-white"
          : "bg-gray-200/20"
      } ${className}`}
      {...rest}
    >
      {label || children}
    </button>
  );
};

export default CommonButton;
