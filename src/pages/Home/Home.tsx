import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-grow py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Welcome to Our Platform
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8 text-center max-w-2xl">
          Discover our amazing services that make your life easier and more
          enjoyable.
        </p>
        <button className="px-8 py-4 bg-white text-indigo-600 rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-white text-gray-800">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12 text-indigo-600">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Feature One</h3>
              <p className="text-gray-700">
                Explore this amazing feature that brings you unparalleled
                convenience and efficiency.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Feature Two</h3>
              <p className="text-gray-700">
                Enhance your experience with our innovative solutions designed
                just for you.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-lg text-center">
              <h3 className="text-2xl font-semibold mb-4">Feature Three</h3>
              <p className="text-gray-700">
                Discover the power of our platform and unlock new possibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-indigo-700 w-full text-center text-white">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
