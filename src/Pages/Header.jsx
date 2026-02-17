import React from "react";

function Header() {
  return (
    <header className="bg-white  z-10">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <div className="w-6 h-6 relative">
              <div className="absolute inset-0 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">SARL BENHADOU</h1>
            <p className="text-sm text-gray-600">Travaux Bâtiment</p>
          </div>
        </div>

        {/* URL Input */}
       

        {/* Additional Info */}
        <div className="text-right">
          <p className="text-sm text-gray-600">Server: Algerie Telecom</p>
          <div className="flex items-center justify-end space-x-2 mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
