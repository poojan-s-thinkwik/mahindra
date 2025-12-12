const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="mt-8">
        <span className="bg-white text-gray-800 rounded-full px-4 py-2 shadow-md hover:bg-gray-100 transition-colors duration-300 ease-in-out">
          Go Back Home
        </span>
      </div>
    </div>
  );
};

export default NotFoundPage;
