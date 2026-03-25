// src/firebase/employees.js
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";

const EMPLOYEES_COLLECTION = "employees";
const ROLES_COLLECTION = "roles";

// Generate a unique 4-digit ID not already in use
export async function generateUniqueId() {
  const snapshot = await getDocs(collection(db, EMPLOYEES_COLLECTION));
  const existingIds = new Set(snapshot.docs.map((d) => d.data().employeeId));
  let id;
  let attempts = 0;
  do {
    id = String(Math.floor(1000 + Math.random() * 9000));
    attempts++;
    if (attempts > 200) throw new Error("Could not generate unique ID");
  } while (existingIds.has(id));
  return id;
}

// Get all employees
export async function getAllEmployees() {
  const snapshot = await getDocs(collection(db, EMPLOYEES_COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Get employee by 4-digit employeeId field
export async function getEmployeeByCode(code) {
  const q = query(
    collection(db, EMPLOYEES_COLLECTION),
    where("employeeId", "==", String(code))
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const docSnap = snapshot.docs[0];
  return { id: docSnap.id, ...docSnap.data() };
}

// Get employee by Firestore document ID
export async function getEmployeeById(id) {
  const docRef = doc(db, EMPLOYEES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

// Add new employee
export async function addEmployee(employeeData) {
  const employeeId = await generateUniqueId();
  const payload = {
    ...employeeData,
    employeeId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const ref = await addDoc(collection(db, EMPLOYEES_COLLECTION), payload);
  return { id: ref.id, ...payload };
}

// Update employee
export async function updateEmployee(id, data) {
  const docRef = doc(db, EMPLOYEES_COLLECTION, id);
  const payload = { ...data, updatedAt: new Date().toISOString() };
  await updateDoc(docRef, payload);
  return payload;
}

// Delete employee
export async function deleteEmployee(id) {
  await deleteDoc(doc(db, EMPLOYEES_COLLECTION, id));
}

// ─── Roles ────────────────────────────────────────────────────────────────────

export async function getAllRoles() {
  const snapshot = await getDocs(collection(db, ROLES_COLLECTION));
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getRoleById(id) {
  const docRef = doc(db, ROLES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() };
}

export async function addRole(roleData) {
  // roleData: { name: string, apps: [{ appName, appLink }] }
  const payload = {
    ...roleData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const ref = await addDoc(collection(db, ROLES_COLLECTION), payload);
  return { id: ref.id, ...payload };
}

export async function updateRole(id, data) {
  const docRef = doc(db, ROLES_COLLECTION, id);
  const payload = { ...data, updatedAt: new Date().toISOString() };
  await updateDoc(docRef, payload);
}

export async function deleteRole(id) {
  await deleteDoc(doc(db, ROLES_COLLECTION, id));
}

// Get apps for a specific employee (via their roleId)
export async function getAppsForEmployee(employee) {
  if (!employee?.roleId) return [];
  const role = await getRoleById(employee.roleId);
  if (!role) return [];
  return role.apps || [];
}
