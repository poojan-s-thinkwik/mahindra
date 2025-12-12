import EmailIcon from '@rsuite/icons/Email';

const InputField = () => {
  return (
    <>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 font-semibold mb-2"
        >
          Email
        </label>
        <div className="flex items-center border-black border-2 border-t-0 border-x-0">
          <span className="p-1 text-2xl">
            <EmailIcon />
          </span>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-2 border-0"
          />
        </div>
      </div>
    </>
  );
};

export default InputField;
