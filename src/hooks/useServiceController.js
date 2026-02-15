// src/hooks/useServiceController.js
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// ==========================================
// 1. FUNCTION: GET SERVICE DATA
// Input: Service ID
// Returns: Name, Guide Link, Offer Link, Complain Link
// ==========================================
export const getServiceData = async (serviceId) => {
  try {
    const serviceRef = doc(db, "services", serviceId);
    const serviceSnap = await getDoc(serviceRef);

    if (serviceSnap.exists()) {
      const data = serviceSnap.data();
      return {
        id: serviceSnap.id,
        name: data.name,
        guideLink: data.guideLink,
        offerLink: data.offerLink,
        complainLink: data.complainLink
      };
    } else {
      console.error("No such service found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching service data:", error);
    return null;
  }
};

// ==========================================
// 2. FUNCTION: GET CLIENT CONNECTION STATUS
// Input: Service ID, Client 5-Digit ID
// Returns: Activation Link, Status
// ==========================================
export const getClientConnection = async (serviceId, client5DigitId) => {
  try {
    // We look directly into the nested sub-collection
    // path: services -> {serviceId} -> assignments -> {clientId}
    const assignmentRef = doc(db, "services", serviceId, "assignments", client5DigitId);
    const assignmentSnap = await getDoc(assignmentRef);

    if (assignmentSnap.exists()) {
      const data = assignmentSnap.data();
      return {
        status: data.status,             // e.g., "active", "inactive"
        activationLink: data.activationLink, 
        startDate: data.startDate        // Optional: if you need the date
      };
    } else {
      // If the doc doesn't exist, the client is NOT assigned to this service
      return {
        status: "not_assigned",
        activationLink: null
      };
    }
  } catch (error) {
    console.error("Error fetching connection status:", error);
    return null;
  }
};