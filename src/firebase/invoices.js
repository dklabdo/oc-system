// src/firebase/invoices.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./config";

const INVOICES_COLLECTION = "invoices";

function createInvoiceNumber() {
  const date = new Date();
  const stamp = date.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = String(Math.floor(1000 + Math.random() * 9000));
  return `INV-${stamp}-${suffix}`;
}

export async function addInvoice(invoiceData) {
  const user = auth.currentUser;
  const payload = {
    ...invoiceData,
    invoiceNumber: invoiceData.invoiceNumber || createInvoiceNumber(),
    status: invoiceData.status || "created",
    createdBy: user
      ? {
          uid: user.uid,
          email: user.email || "",
        }
      : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const ref = await addDoc(collection(db, INVOICES_COLLECTION), payload);
  return { id: ref.id, ...payload };
}

export async function getAllInvoices() {
  const q = query(
    collection(db, INVOICES_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateInvoice(id, invoiceData) {
  const docRef = doc(db, INVOICES_COLLECTION, id);
  const payload = {
    ...invoiceData,
    updatedAt: new Date().toISOString(),
  };
  await updateDoc(docRef, payload);
  return { id, ...payload };
}

export async function deleteInvoice(id) {
  await deleteDoc(doc(db, INVOICES_COLLECTION, id));
}
