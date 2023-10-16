const PrimaryButton = ({ text, onClick, bgColor }) => {
  return (
    <button
      style={{
        textShadow:
          "-1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px -1.5px 0 #000",
      }}
      className={`${
        bgColor != null ? bgColor : "bg-yellow-500"
      } w-full font-bold text-white p-2 text-xl rounded-full shadow-md transform transition duration-200 hover:scale-105`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
