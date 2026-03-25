// src/firebase/sessions.js
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const SESSIONS_COLLECTION = "sessions";

/**
 * Start a new session when an employee connects to workspace.
 * Returns the created session's Firestore document ID.
 */
export async function startSession(employee) {
  const now = new Date();
  const payload = {
    employeeId: employee.employeeId,
    employeeName: employee.name,
    employeeDocId: employee.id,
    date: now.toISOString().split("T")[0], // "YYYY-MM-DD"
    startTime: now.toLocaleTimeString("en-US", { hour12: false }),
    endTime: null,
    status: "online",
    duration: null,
    startedAt: serverTimestamp(),
    endedAt: null,
  };
  const ref = await addDoc(collection(db, SESSIONS_COLLECTION), payload);
  return ref.id;
}

/**
 * End a session — sets status to offline, records end time and duration.
 */
export async function endSession(sessionId) {
  if (!sessionId) return;
  const docRef = doc(db, SESSIONS_COLLECTION, sessionId);
  const now = new Date();
  await updateDoc(docRef, {
    endTime: now.toLocaleTimeString("en-US", { hour12: false }),
    status: "offline",
    endedAt: serverTimestamp(),
  });
}

/**
 * Get all sessions, ordered by most recent first.
 */
export async function getAllSessions() {
  const q = query(
    collection(db, SESSIONS_COLLECTION),
    orderBy("startedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Get sessions filtered by employee code.
 */
export async function getSessionsByEmployee(employeeId) {
  const q = query(
    collection(db, SESSIONS_COLLECTION),
    where("employeeId", "==", employeeId),
    orderBy("startedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
