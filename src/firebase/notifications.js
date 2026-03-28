// src/firebase/notifications.js
import { ref, push, serverTimestamp } from "firebase/database";
import { rtdb } from "./config";

/**
 * Send a meeting notification to Firebase Realtime Database.
 *
 * @param {Object} params
 * @param {Object} params.creator       – { name, email, employeeId }
 * @param {Array}  params.participants   – [{ name, email, employeeId }, ...]
 * @param {string} params.meetingUrl     – Google Meet URL
 * @returns {Promise<string>} The key of the newly created notification
 */
export async function sendMeetingNotification({ creator, participants, meetingUrl }) {
  const notificationRef = ref(rtdb, "notifications");

  const notification = {
    notificationType: "meeting",
    creator: {
      name: creator.name,
      email: creator.email,
      employeeId: creator.employeeId,
    },
    notifiedPersons: participants.map((p) => ({
      name: p.name,
      email: p.email,
      employeeId: p.employeeId,
    })),
    notificationAction: meetingUrl,
    createdAt: new Date().toISOString(),
  };

  const newRef = await push(notificationRef, notification);
  return newRef.key;
}
