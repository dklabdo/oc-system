import React, { useState } from "react";
import { ExternalLink, AlertCircle } from "lucide-react";
import Header from "./Header";

function ERP() {
  const [url, setUrl] = useState("https://example.com");
  const [currentUrl, setCurrentUrl] = useState(
    "https://benhadou.erp.ocestral.com/",
  );
  const [error, setError] = useState(false);

  const handleLoadWebsite = () => {
    setCurrentUrl(url);
    setError(false);
  };

  const handleIframeError = () => {
    setError(true);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <Header />
      {/* Content Area - Embedded Website */}
      <div className="flex-1 relative overflow-hidden">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-20">
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Cannot Load Website
              </h3>
              <p className="text-gray-600 mb-4">
                This website cannot be embedded due to security restrictions
                (X-Frame-Options).
              </p>
              <a>
                href={currentUrl}
                target="_blank" rel="noopener noreferrer" className="inline-flex
                items-center space-x-2 px-6 py-3 bg-blue-500 text-white
                rounded-lg hover:bg-blue-600 transition-colors"
                <ExternalLink className="w-4 h-4" />
                <span>Open in New Tab</span>
              </a>
            </div>
          </div>
        )}
        <iframe
          src="https://benhadou.erp.ocestral.com/"
          title="ERP Login"
          // Add 'storage-access' to the allow attribute
          allow="storage-access"
          sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-popups"
          style={{ width: "100%", height: "100vh", border: "none" }}
        />
      </div>
    </div>
  );
}

export default ERP;
