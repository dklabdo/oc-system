import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Calculator,
  Edit3,
  FileText,
  Hash,
  Landmark,
  Mail,
  MapPin,
  Percent,
  Plus,
  Printer,
  ReceiptText,
  RotateCcw,
  Save,
  Send,
  Trash2,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  addInvoice,
  deleteInvoice,
  getAllInvoices,
  updateInvoice,
} from "../firebase/invoices";

const EMPTY_COMPANY = {
  name: "",
  address: "",
  email: "",
  nif: "",
  rib: "",
  number: "",
};

const EMPTY_CLIENT = {
  name: "",
  address: "",
  email: "",
  number: "",
};

const EMPTY_TAX_DISCOUNT = {
  taxName: "",
  taxPercentage: "0",
  discountName: "",
  discountPercentage: "0",
};

const INVOICE_TYPES = [
  {
    value: "proforma",
    label: "Facture proforma",
    description: "Document provisoire",
  },
  {
    value: "facture",
    label: "Facture",
    description: "Document final",
  },
];

function getInvoiceTypeMeta(value) {
  return (
    INVOICE_TYPES.find((type) => type.value === value) ||
    INVOICE_TYPES.find((type) => type.value === "facture")
  );
}

function makeItemId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `item-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

function createLineItem() {
  return {
    id: makeItemId(),
    productName: "",
    price: "",
    quantity: "1",
  };
}

function toNumber(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-DZ", {
    style: "currency",
    currency: "DZD",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function formatDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-DZ", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(date);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function invoicePrintHtml(invoice) {
  const company = invoice.company || {};
  const client = invoice.client || {};
  const tax = invoice.tax || {};
  const discount = invoice.discount || {};
  const items = invoice.items || [];
  const typeMeta = getInvoiceTypeMeta(invoice.invoiceType);
  const isFinalInvoice = typeMeta.value === "facture";
  const invoiceNumber = invoice.invoiceNumber || typeMeta.label;
  const invoiceDate = formatDate(invoice.createdAt);
  const logoUrl =
    typeof window !== "undefined" ? `${window.location.origin}/logo.svg` : "/logo.svg";

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td><strong>${escapeHtml(item.productName)}</strong></td>
          <td>${formatCurrency(item.price)}</td>
          <td>${escapeHtml(item.quantity)}</td>
          <td>${formatCurrency(item.total)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>${escapeHtml(invoiceNumber)}</title>
        <style>
          @page { size: A4; margin: 18mm; }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            color: #172033;
            background: #ffffff;
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            font-size: 12px;
            line-height: 1.5;
          }
          .invoice { max-width: 760px; margin: 0 auto; }
          
          .header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 48px;
            padding-bottom: 30px;
            border-bottom: 1px solid #dbe3f3;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 26px;
          }
          .brand-logo {
            width: 52px;
            height: 52px;
            object-fit: contain;
            border-radius: 12px;
            background: #f5f7ff;
            padding: 8px;
            border: 1px solid #dbe3f3;
          }
          h1, h2, h3, p { margin: 0; }
          h1 {
            color: #102453;
            
            font-size: 24px;
            padding: 10px 0;
            line-height: 1;
            letter-spacing: 0;
            font-weight: 700;
          }
          .type-badge {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            margin-top: 14px;
            padding: 7px 12px;
            color: ${isFinalInvoice ? "#0f766e" : "#295eff"};
            background: ${isFinalInvoice ? "#ecfdf5" : "#eef4ff"};
            border: 1px solid ${isFinalInvoice ? "#99f6e4" : "#bfd0ff"};
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .invoice-meta {
            text-align: right;
            color: #667085;
            min-width: 220px;
          }
          .invoice-number {
            display: block;
            margin-top: 10px;
            color: #102453;
            font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
            font-size: 13px;
            font-weight: 700;
          }
          .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 36px;
            margin-top: 34px;
          }
          .party {
            border: 1px solid #e5ecfb;
            background: #fbfcff;
            border-radius: 16px;
            padding: 18px;
          }
          .label {
            color: #295eff;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            margin-bottom: 10px;
          }
          .name {
            color: #102453;
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 8px;
          }
          .muted { color: #667085; }
          .details { margin-top: 8px; color: #667085; }
          .details span { display: block; }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 42px;
          }
          th {
            padding: 12px 0;
            border-bottom: 1px solid #295eff;
            color: #295eff;
            font-size: 10px;
            letter-spacing: 0.1em;
            text-align: left;
            text-transform: uppercase;
          }
          th:nth-child(2),
          th:nth-child(3),
          th:nth-child(4),
          td:nth-child(2),
          td:nth-child(3),
          td:nth-child(4) {
            text-align: right;
          }
          td {
            padding: 16px 0;
            border-bottom: 1px solid #e8eefb;
            color: #263247;
            vertical-align: top;
          }
          .summary {
            width: 320px;
            margin: 12px 0 0 auto;
            border: 1px solid #dbe3f3;
            border-radius: 16px;
            padding: 14px 18px;
            background: #fbfcff;
          }
          .summary-row {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            padding: 8px 0;
            color: #526176;
          }
          .summary-row.total {
            margin-top: 5px;
            padding-top: 16px;
            border-top: 1px solid #295eff;
            color: #102453;
            font-size: 12px;
            font-weight: 800;
          }
          .footer {
            margin-top: 54px;
            padding-top: 18px;
            border-top: 1px solid #dbe3f3;
            display: flex;
            justify-content: space-between;
            gap: 28px;
            color: #667085;
            font-size: 11px;
          }
          .print-actions {
            position: fixed;
            top: 16px;
            right: 16px;
            display: flex;
            gap: 8px;
          }
          .print-actions button {
            border: 0;
            border-radius: 8px;
            background: #295eff;
            color: #ffffff;
            cursor: pointer;
            font: inherit;
            padding: 10px 14px;
          }
          @media print {
            .print-actions { display: none; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="print-actions">
          <button onclick="window.print()">Enregistrer en PDF</button>
        </div>
        <main class="invoice">
          <div class="topline"></div>
          <header class="header">
            <div>
              <div class="">
                <img class="" width="70" src="${escapeHtml(logoUrl)}" alt="Logo" />
                <div>
                  <h1>${escapeHtml(typeMeta.label)}</h1>
                </div>
              </div>
            </div>
            <div class="invoice-meta">
              <span class="muted">Date d'émission</span>
              <span class="invoice-number">${escapeHtml(invoiceDate)}</span>
              <span class="muted" style="display:block;margin-top:18px;">N° document</span>
              <span class="invoice-number">${escapeHtml(invoiceNumber)}</span>
            </div>
          </header>

          <section class="grid">
            <div class="">
              <p class="label">Prestataire</p>
              <p class="name">${escapeHtml(company.name || "-")}</p>
              <p class="muted">${escapeHtml(company.address || "")}</p>
              <div class="details">
                ${company.email ? `<span>${escapeHtml(company.email)}</span>` : ""}
                ${company.nif ? `<span>NIF: ${escapeHtml(company.nif)}</span>` : ""}
                ${company.number ? `<span>N: ${escapeHtml(company.number)}</span>` : ""}
              </div>
            </div>
            <div class="">
              <p class="label">Client</p>
              <p class="name">${escapeHtml(client.name || "-")}</p>
              <p class="muted">${escapeHtml(client.address || "")}</p>
              <div class="details">
                ${client.email ? `<span>${escapeHtml(client.email)}</span>` : ""}
                ${client.number ? `<span>N: ${escapeHtml(client.number)}</span>` : ""}
              </div>
            </div>
          </section>

          <table>
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Prix unitaire</th>
                <th>Qté</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <section class="summary">
            <div class="summary-row">
              <span>Sous-total</span>
              <strong>${formatCurrency(invoice.subtotal)}</strong>
            </div>
            <div class="summary-row">
              <span>${escapeHtml(tax.name || "Taxe")} (${escapeHtml(
    tax.percentage || 0
  )}%)</span>
              <strong>${formatCurrency(tax.amount)}</strong>
            </div>
            
            <div class="summary-row total">
              <span>Total à payer</span>
              <span>${formatCurrency(invoice.total)}</span>
            </div>
          </section>

          <footer class="footer">
            <div>
              <strong style="color:#102453;">Coordonnées bancaires</strong><br />
              ${
                company.rib
                  ? `RIB: ${escapeHtml(company.rib)}`
                  : "Coordonnées disponibles sur demande"
              }
            </div>
            <div style="text-align:right;">
              ${
                isFinalInvoice
                  ? "Cette facture constitue le document final."
                  : "Cette facture proforma est un document provisoire."
              }<br />
              Merci pour votre confiance.
            </div>
          </footer>
        </main>
      </body>
    </html>
  `;
}

function openInvoicePdf(invoice) {
  if (!invoice) return;

  const printWindow = window.open("", "_blank", "width=920,height=1200");
  if (!printWindow) {
    toast.error("Autorisez les pop-ups pour générer le PDF");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(invoicePrintHtml(invoice));
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => printWindow.print(), 350);
}

function emailInvoice(invoice) {
  const clientEmail = invoice?.client?.email;
  if (!clientEmail) {
    toast.error("Ajoutez l'email du client avant l'envoi");
    return;
  }

  const typeMeta = getInvoiceTypeMeta(invoice.invoiceType);
  const subject = `${typeMeta.label} ${invoice.invoiceNumber}`;
  const body = [
    `Bonjour ${invoice.client?.name || ""},`,
    "",
    `Veuillez trouver ${typeMeta.label.toLowerCase()} ${
      invoice.invoiceNumber
    } d'un montant de ${formatCurrency(
      invoice.total
    )}.`,
    "",
    "Cordialement,",
    invoice.company?.name || "",
  ].join("\n");

  window.location.href = `mailto:${encodeURIComponent(
    clientEmail
  )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  toast.success("Brouillon email ouvert. Joignez le PDF avant l'envoi.");
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  className = "",
  min,
  step,
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-ink-400 font-medium block mb-1.5">
        {label}
      </span>
      <div className="relative">
        {Icon && (
          <Icon
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
          />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          step={step}
          className={`
            w-full rounded-xl bg-surface border border-surface-border
            ${Icon ? "pl-9" : "pl-3.5"} pr-3.5 py-2.5
            text-ink-50 text-sm placeholder:text-ink-600 input-focus
          `}
        />
      </div>
    </label>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <section className="glass rounded-2xl border border-surface-border overflow-hidden">
      <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          <Icon size={18} />
        </div>
        <h2 className="text-base font-display font-semibold text-ink-50">
          {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value, strong = false, tone = "text-ink-50" }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        strong ? "pt-3 mt-2 border-t border-surface-border" : ""
      }`}
    >
      <span className="text-sm text-ink-400">{label}</span>
      <span
        className={`font-mono ${
          strong ? `text-lg font-bold ${tone}` : `text-sm ${tone}`
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function InvoicesPage() {
  const [company, setCompany] = useState({ ...EMPTY_COMPANY });
  const [client, setClient] = useState({ ...EMPTY_CLIENT });
  const [items, setItems] = useState([createLineItem()]);
  const [taxDiscount, setTaxDiscount] = useState({ ...EMPTY_TAX_DISCOUNT });
  const [invoiceType, setInvoiceType] = useState("facture");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [mode, setMode] = useState("list");
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [deletingId, setDeletingId] = useState("");
  const [lastCreated, setLastCreated] = useState(null);

  const setCompanyField = (key, value) => {
    setCompany((current) => ({ ...current, [key]: value }));
  };

  const setClientField = (key, value) => {
    setClient((current) => ({ ...current, [key]: value }));
  };

  const setTaxDiscountField = (key, value) => {
    setTaxDiscount((current) => ({ ...current, [key]: value }));
  };

  const updateItem = (id, key, value) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const addItem = () => {
    setItems((current) => [...current, createLineItem()]);
  };

  const removeItem = (id) => {
    setItems((current) =>
      current.length === 1 ? current : current.filter((item) => item.id !== id)
    );
  };

  const totals = useMemo(() => {
    const normalizedItems = items.map((item) => {
      const price = toNumber(item.price);
      const quantity = toNumber(item.quantity);
      return {
        ...item,
        price,
        quantity,
        total: price * quantity,
      };
    });

    const subtotal = normalizedItems.reduce((sum, item) => sum + item.total, 0);
    const taxPercentage = Math.max(0, toNumber(taxDiscount.taxPercentage));
    const discountPercentage = Math.max(
      0,
      toNumber(taxDiscount.discountPercentage)
    );
    const taxAmount = subtotal * (taxPercentage / 100);
    const discountAmount = subtotal * (discountPercentage / 100);
    const total = Math.max(0, subtotal + taxAmount - discountAmount);

    return {
      items: normalizedItems,
      subtotal,
      taxPercentage,
      discountPercentage,
      taxAmount,
      discountAmount,
      total,
    };
  }, [items, taxDiscount.taxPercentage, taxDiscount.discountPercentage]);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const nextInvoices = await getAllInvoices();
      setInvoices(nextInvoices);
    } catch (err) {
      console.error(err);
      toast.error("Impossible de charger les factures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  const resetForm = () => {
    setCompany({ ...EMPTY_COMPANY });
    setClient({ ...EMPTY_CLIENT });
    setItems([createLineItem()]);
    setTaxDiscount({ ...EMPTY_TAX_DISCOUNT });
    setInvoiceType("facture");
  };

  const openCreateForm = () => {
    resetForm();
    setEditingInvoice(null);
    setLastCreated(null);
    setMode("form");
  };

  const openEditForm = (invoice) => {
    setCompany({ ...EMPTY_COMPANY, ...(invoice.company || {}) });
    setClient({ ...EMPTY_CLIENT, ...(invoice.client || {}) });
    setItems(
      invoice.items?.length
        ? invoice.items.map((item) => ({
            id: makeItemId(),
            productName: item.productName || "",
            price: String(item.price ?? ""),
            quantity: String(item.quantity ?? "1"),
          }))
        : [createLineItem()]
    );
    setTaxDiscount({
      taxName: invoice.tax?.name || "",
      taxPercentage: String(invoice.tax?.percentage ?? "0"),
      discountName: invoice.discount?.name || "",
      discountPercentage: String(invoice.discount?.percentage ?? "0"),
    });
    setInvoiceType(invoice.invoiceType || "facture");
    setEditingInvoice(invoice);
    setLastCreated(null);
    setMode("form");
  };

  const closeForm = () => {
    resetForm();
    setEditingInvoice(null);
    setMode("list");
  };

  const buildInvoicePayload = (validItems) => ({
    invoiceType,
    status: invoiceType === "facture" ? "final" : "proforma",
    company,
    client,
    items: validItems.map(({ id, ...item }) => item),
    tax: {
      name: taxDiscount.taxName,
      percentage: totals.taxPercentage,
      amount: totals.taxAmount,
    },
    discount: {
      name: taxDiscount.discountName,
      percentage: totals.discountPercentage,
      amount: totals.discountAmount,
    },
    subtotal: totals.subtotal,
    total: totals.total,
  });

  const handleDelete = async (invoice) => {
    if (!window.confirm(`Supprimer ${invoice.invoiceNumber} ?`)) return;

    setDeletingId(invoice.id);
    try {
      await deleteInvoice(invoice.id);
      setInvoices((current) => current.filter((item) => item.id !== invoice.id));
      if (lastCreated?.id === invoice.id) setLastCreated(null);
      toast.success("Facture supprimée");
    } catch (err) {
      if (err.code === "permission-denied") {
        toast.error("Les règles Firestore ne permettent pas la suppression");
      } else {
        toast.error(err.message || "Impossible de supprimer la facture");
      }
    } finally {
      setDeletingId("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validItems = totals.items.filter(
      (item) => item.productName.trim() && item.price > 0 && item.quantity > 0
    );

    if (!company.name.trim()) return toast.error("Le nom de l'entreprise est requis");
    if (!client.name.trim()) return toast.error("Le nom du client est requis");
    if (validItems.length === 0) {
      return toast.error("Ajoutez au moins un produit avec prix et quantité");
    }

    setSaving(true);
    try {
      const payload = buildInvoicePayload(validItems);

      const savedInvoice = editingInvoice
        ? {
            ...editingInvoice,
            ...(await updateInvoice(editingInvoice.id, payload)),
          }
        : await addInvoice(payload);

      setLastCreated(savedInvoice);
      toast.success(
        editingInvoice
          ? `${savedInvoice.invoiceNumber} mise à jour`
          : `${savedInvoice.invoiceNumber} créée`
      );
      resetForm();
      setEditingInvoice(null);
      setMode("list");
      await loadInvoices();
    } catch (err) {
      if (err.code === "permission-denied") {
        toast.error("Les règles Firestore ne permettent pas l'enregistrement");
      } else {
        toast.error(err.message || "Impossible d'enregistrer la facture");
      }
    } finally {
      setSaving(false);
    }
  };

  if (mode === "list") {
    return (
      <div className="animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-ink-50">
              Factures
            </h1>
            <p className="text-sm text-ink-400 mt-0.5">
              Consultez, créez, modifiez, supprimez et envoyez vos factures.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateForm}
            className="btn-shimmer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark transition-all glow-accent-sm whitespace-nowrap"
          >
            <Plus size={14} />
            Ajouter une facture
          </button>
        </div>

        {lastCreated && (
          <div className="glass rounded-xl px-5 py-4 border-surface-border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <ReceiptText size={17} />
              </div>
              <div>
                <p className="text-sm text-ink-50 font-medium">
                  {lastCreated.invoiceNumber}
                </p>
                <p className="text-xs text-ink-500">
                  Total enregistré {formatCurrency(lastCreated.total)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => openInvoicePdf(lastCreated)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-50 text-surface text-xs font-semibold hover:opacity-90 transition-all"
              >
                <Printer size={13} />
                Générer le PDF
              </button>
              <button
                type="button"
                onClick={() => emailInvoice(lastCreated)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-float border border-surface-border text-ink-300 text-xs font-semibold hover:text-ink-50 transition-all"
              >
                <Send size={13} />
                Envoyer au client
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            ["Total", invoices.length, "text-ink-50"],
            [
              "Clients",
              new Set(invoices.map((invoice) => invoice.client?.name).filter(Boolean))
                .size,
              "text-blue-300",
            ],
            [
              "Factures",
              invoices.filter((invoice) => invoice.invoiceType !== "proforma")
                .length,
              "text-purple-300",
            ],
            [
              "Proformas",
              invoices.filter((invoice) => invoice.invoiceType === "proforma")
                .length,
              "text-green-400",
            ],
            [
              "Montant",
              formatCurrency(
                invoices.reduce((sum, invoice) => sum + toNumber(invoice.total), 0)
              ),
              "text-accent",
            ],
          ].map(([label, count, color]) => (
            <div key={label} className="glass rounded-xl p-4 border-surface-border">
              <div className={`text-2xl font-display font-bold ${color}`}>
                {count}
              </div>
              <div className="text-xs text-ink-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        <div className="glass rounded-2xl overflow-hidden border border-surface-border">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-ink-500">Chargement des factures...</p>
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-surface-float border border-surface-border flex items-center justify-center mx-auto mb-4">
                <ReceiptText size={24} />
              </div>
              <p className="text-ink-400 text-sm">Aucune facture pour le moment</p>
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-3 text-sm text-accent hover:text-accent-muted transition-colors"
              >
                Ajouter votre première facture
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px]">
                <thead>
                  <tr className="border-b border-surface-border">
                    {[
                      "Document",
                      "Client",
                      "Date",
                      "Articles",
                      "Total",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="border-b border-surface-border hover:bg-surface-float/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-ink-50">
                          {invoice.invoiceNumber}
                        </div>
                        <div className="text-xs text-ink-500">
                          {getInvoiceTypeMeta(invoice.invoiceType).label}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-ink-50">
                          {invoice.client?.name || "-"}
                        </div>
                        <div className="text-xs text-ink-500">
                          {invoice.client?.email || "Aucun email"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-ink-400 font-mono">
                        {formatDate(invoice.createdAt) || "-"}
                      </td>
                      <td className="px-4 py-3 text-sm text-ink-400">
                        {(invoice.items || []).length}
                      </td>
                      <td className="px-4 py-3 text-sm text-accent font-mono">
                        {formatCurrency(invoice.total)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openInvoicePdf(invoice)}
                            className="w-9 h-9 rounded-lg border border-surface-border text-ink-500 hover:text-ink-50 hover:border-ink-500 transition-all flex items-center justify-center"
                            title="Générer le PDF"
                            aria-label="Générer le PDF"
                          >
                            <Printer size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => emailInvoice(invoice)}
                            className="w-9 h-9 rounded-lg border border-surface-border text-ink-500 hover:text-ink-50 hover:border-ink-500 transition-all flex items-center justify-center"
                            title="Envoyer au client"
                            aria-label="Envoyer au client"
                          >
                            <Send size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditForm(invoice)}
                            className="w-9 h-9 rounded-lg border border-surface-border text-ink-500 hover:text-ink-50 hover:border-ink-500 transition-all flex items-center justify-center"
                            title="Modifier la facture"
                            aria-label="Modifier la facture"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(invoice)}
                            disabled={deletingId === invoice.id}
                            className="w-9 h-9 rounded-lg border border-surface-border text-ink-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 disabled:opacity-40 transition-all flex items-center justify-center"
                            title="Supprimer la facture"
                            aria-label="Supprimer la facture"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink-50">
            {editingInvoice ? "Modifier la facture" : "Créer une facture"}
          </h1>
          <p className="text-sm text-ink-400 mt-0.5">
            {editingInvoice
              ? `Modifier ${editingInvoice.invoiceNumber}`
              : "Renseignez l'entreprise, le client, les articles, la taxe et la remise."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={closeForm}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-ink-400 hover:text-ink-50 text-sm transition-all"
          >
            <ArrowLeft size={14} />
            Factures
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-ink-400 hover:text-ink-50 text-sm transition-all"
          >
            <RotateCcw size={14} />
            Réinitialiser
          </button>
          <button
            type="submit"
            form="invoice-form"
            disabled={saving}
            className="btn-shimmer flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent text-white font-semibold text-sm hover:bg-accent-dark disabled:opacity-40 transition-all glow-accent-sm whitespace-nowrap"
          >
            <Save size={14} />
            {saving
              ? "Enregistrement..."
              : editingInvoice
              ? "Enregistrer"
              : "Créer la facture"}
          </button>
        </div>
      </div>

      {lastCreated && (
        <div className="glass rounded-xl px-5 py-4 border-surface-border mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
              <ReceiptText size={17} />
            </div>
            <div>
              <p className="text-sm text-ink-50 font-medium">
                {lastCreated.invoiceNumber}
              </p>
              <p className="text-xs text-ink-500">
                Total enregistré {formatCurrency(lastCreated.total)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => openInvoicePdf(lastCreated)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-50 text-surface text-xs font-semibold hover:opacity-90 transition-all"
            >
              <Printer size={13} />
              Générer le PDF
            </button>
            <button
              type="button"
              onClick={() => emailInvoice(lastCreated)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-float border border-surface-border text-ink-300 text-xs font-semibold hover:text-ink-50 transition-all"
            >
              <Send size={13} />
              Envoyer au client
            </button>
          </div>
        </div>
      )}

      <form
        id="invoice-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start"
      >
        <div className="space-y-6">
          <Section icon={Building2} title="Informations entreprise">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                icon={Building2}
                label="Nom de l'entreprise *"
                value={company.name}
                onChange={(value) => setCompanyField("name", value)}
                placeholder="Nom de l'entreprise"
                required
                className="md:col-span-2"
              />
              <Field
                icon={MapPin}
                label="Adresse de l'entreprise"
                value={company.address}
                onChange={(value) => setCompanyField("address", value)}
                placeholder="Rue, ville"
                className="md:col-span-2"
              />
              <Field
                icon={Mail}
                label="Email de l'entreprise"
                value={company.email}
                onChange={(value) => setCompanyField("email", value)}
                placeholder="company@example.com"
                type="email"
              />
              <Field
                icon={Hash}
                label="NIF"
                value={company.nif}
                onChange={(value) => setCompanyField("nif", value)}
                placeholder="NIF"
              />
              <Field
                icon={Landmark}
                label="RIB"
                value={company.rib}
                onChange={(value) => setCompanyField("rib", value)}
                placeholder="RIB"
              />
              <Field
                icon={Hash}
                label="N"
                value={company.number}
                onChange={(value) => setCompanyField("number", value)}
                placeholder="Numéro entreprise"
              />
            </div>
          </Section>

          <Section icon={User} title="Informations client">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                icon={User}
                label="Nom du client *"
                value={client.name}
                onChange={(value) => setClientField("name", value)}
                placeholder="Nom du client"
                required
                className="md:col-span-2"
              />
              <Field
                icon={MapPin}
                label="Adresse du client"
                value={client.address}
                onChange={(value) => setClientField("address", value)}
                placeholder="Rue, ville"
                className="md:col-span-2"
              />
              <Field
                icon={Mail}
                label="Email du client"
                value={client.email}
                onChange={(value) => setClientField("email", value)}
                placeholder="client@example.com"
                type="email"
              />
              <Field
                icon={Hash}
                label="N"
                value={client.number}
                onChange={(value) => setClientField("number", value)}
                placeholder="Numéro client"
              />
            </div>
          </Section>

          <Section icon={FileText} title="Informations facture">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <label className="block">
                <span className="text-xs text-ink-400 font-medium block mb-1.5">
                  Type de facture
                </span>
                <select
                  value={invoiceType}
                  onChange={(event) => setInvoiceType(event.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-surface-border text-ink-50 text-sm input-focus"
                >
                  {INVOICE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="rounded-xl bg-surface-float border border-surface-border px-4 py-3">
                <p className="text-xs text-ink-500">Statut du document</p>
                <p className="text-sm text-ink-50 font-medium mt-1">
                  {getInvoiceTypeMeta(invoiceType).description}
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-surface-border">
                    {["Désignation", "Prix", "Quantité", "Total", ""].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-3 pb-3 text-left text-xs font-medium text-ink-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const total = toNumber(item.price) * toNumber(item.quantity);

                    return (
                      <tr key={item.id} className="border-b border-surface-border">
                        <td className="px-3 py-3">
                          <input
                            value={item.productName}
                            onChange={(e) =>
                              updateItem(item.id, "productName", e.target.value)
                            }
                            placeholder="Produit ou service"
                            className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-border text-ink-50 text-sm placeholder:text-ink-600 input-focus"
                          />
                        </td>
                        <td className="px-3 py-3 w-36">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) =>
                              updateItem(item.id, "price", e.target.value)
                            }
                            placeholder="0"
                            className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-border text-ink-50 text-sm placeholder:text-ink-600 input-focus"
                          />
                        </td>
                        <td className="px-3 py-3 w-32">
                          <input
                            type="number"
                            min="0"
                            step="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(item.id, "quantity", e.target.value)
                            }
                            placeholder="1"
                            className="w-full px-3 py-2.5 rounded-xl bg-surface border border-surface-border text-ink-50 text-sm placeholder:text-ink-600 input-focus"
                          />
                        </td>
                        <td className="px-3 py-3 w-44">
                          <div className="h-[42px] px-3 rounded-xl bg-surface-float border border-surface-border flex items-center text-sm font-mono text-ink-50">
                            {formatCurrency(total)}
                          </div>
                        </td>
                        <td className="px-3 py-3 w-12">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                            className="w-10 h-10 rounded-xl border border-surface-border text-ink-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 disabled:opacity-30 disabled:hover:text-ink-500 disabled:hover:border-surface-border disabled:hover:bg-transparent transition-all flex items-center justify-center"
                            aria-label="Remove product"
                            title="Remove product"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={addItem}
              className="mt-4 inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-float border border-surface-border text-accent text-sm hover:border-accent/40 transition-all"
            >
              <Plus size={14} />
              Ajouter un article
            </button>
          </Section>

          <Section icon={Percent} title="Taxe et remise">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field
                icon={ReceiptText}
                label="Nom de la taxe"
                value={taxDiscount.taxName}
                onChange={(value) => setTaxDiscountField("taxName", value)}
                placeholder="TVA"
              />
              <Field
                icon={Percent}
                label="Pourcentage taxe"
                value={taxDiscount.taxPercentage}
                onChange={(value) =>
                  setTaxDiscountField("taxPercentage", value)
                }
                placeholder="0"
                type="number"
                min="0"
                step="0.01"
              />
              <Field
                icon={ReceiptText}
                label="Nom de la remise"
                value={taxDiscount.discountName}
                onChange={(value) => setTaxDiscountField("discountName", value)}
                placeholder="Remise"
              />
              <Field
                icon={Percent}
                label="Pourcentage remise"
                value={taxDiscount.discountPercentage}
                onChange={(value) =>
                  setTaxDiscountField("discountPercentage", value)
                }
                placeholder="0"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
          </Section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-8">
          <div className="glass rounded-2xl border border-surface-border overflow-hidden">
            <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Calculator size={18} />
              </div>
              <h2 className="text-base font-display font-semibold text-ink-50">
                Totaux
              </h2>
            </div>
            <div className="p-5 space-y-3">
              <SummaryRow
                label="Sous-total"
                value={formatCurrency(totals.subtotal)}
              />
              <SummaryRow
                label={`Taxe ${totals.taxPercentage}%`}
                value={formatCurrency(totals.taxAmount)}
                tone="text-blue-300"
              />
              <SummaryRow
                label={`Remise ${totals.discountPercentage}%`}
                value={`-${formatCurrency(totals.discountAmount)}`}
                tone="text-green-400"
              />
              <SummaryRow
                label="Total"
                value={formatCurrency(totals.total)}
                strong
                tone="text-accent"
              />
            </div>
          </div>

          <div className="glass rounded-2xl border border-surface-border overflow-hidden">
            <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-surface-float border border-surface-border flex items-center justify-center text-ink-400">
                <ReceiptText size={18} />
              </div>
              <h2 className="text-base font-display font-semibold text-ink-50">
                Factures récentes
              </h2>
            </div>
            <div className="p-5">
              {invoices.length === 0 ? (
                <p className="text-sm text-ink-500">Aucune facture</p>
              ) : (
                <div className="space-y-3">
                  {invoices.slice(0, 4).map((invoice) => (
                    <div
                      key={invoice.id}
                      className="flex items-center justify-between gap-3 rounded-xl bg-surface-float border border-surface-border px-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink-50 truncate">
                          {invoice.invoiceNumber}
                        </p>
                        <p className="text-xs text-ink-500 truncate">
                          {invoice.client?.name || "Aucun client"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <p className="text-xs font-mono text-accent">
                          {formatCurrency(invoice.total)}
                        </p>
                        <button
                          type="button"
                          onClick={() => openInvoicePdf(invoice)}
                          className="w-8 h-8 rounded-lg border border-surface-border text-ink-500 hover:text-ink-50 hover:border-ink-500 transition-all flex items-center justify-center"
                          title="Générer le PDF"
                          aria-label="Générer le PDF"
                        >
                          <Printer size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => emailInvoice(invoice)}
                          className="w-8 h-8 rounded-lg border border-surface-border text-ink-500 hover:text-ink-50 hover:border-ink-500 transition-all flex items-center justify-center"
                          title="Envoyer au client"
                          aria-label="Envoyer au client"
                        >
                          <Send size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
