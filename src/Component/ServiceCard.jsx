import { useEffect, useState } from "react";
import { getServiceData, getClientConnection } from "../hooks/useServiceController";

const ServiceCard = ({ serviceId, myClientId }) => {
  const [serviceInfo, setServiceInfo] = useState(null);
  const [myStatus, setMyStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Get the Service Details (Name, Links)
      const details = await getServiceData(serviceId);
      setServiceInfo(details);

      // 2. Get the Connection (Status, Activation Link)
      // Only runs if we have a client ID
      if (myClientId) {
        const connection = await getClientConnection(serviceId, myClientId);
        setMyStatus(connection);
      }
    };

    fetchData();
  }, [serviceId, myClientId]);

  if (!serviceInfo) return <div>Loading Service...</div>;

  return (
    <div className="card">
      {/* Function 1 Output */}
      <h2>{serviceInfo.name}</h2>
      <a href={serviceInfo.guideLink}>Read Guide</a>
      <a href={serviceInfo.offerLink}>View Offers</a>
      <a href={serviceInfo.complainLink}>File Complaint</a>

      <hr />

      {/* Function 2 Output */}
      {myStatus && (
        <div className="status-box">
          <p>Status: <strong>{myStatus.status}</strong></p>
          
          {/* Only show activation link if user is Inactive or needs it */}
          {myStatus.status === 'inactive' && myStatus.activationLink && (
             <a href={myStatus.activationLink} className="btn-activate">
               Activate Now
             </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceCard;