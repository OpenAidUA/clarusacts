import { z } from 'zod';

// Item schema
export const ActItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().positive(),
  unitPrice: z.number().nonnegative(),
  total: z.number().optional(),
});

// Template reference (legal anchor)
export const TemplateRefSchema = z.object({
  id: z.string(),
  version: z.string(),
});

// Main ActDocument schema
export const ActDocumentSchema = z.object({
  id: z.string().uuid().optional(),
  meta: z.object({
    number: z.string(),
    city: z.string().optional(),
    date: z.iso.datetime(),
  }),
  parties: z.object({
    client: z.object({
      name: z.string(),
      representative: z.string().optional(),
    }),
    contractor: z.object({ name: z.string(), representative: z.string() }),
  }),
  items: z.array(ActItemSchema).min(1),
  totals: z
    .object({
      subtotal: z.number().optional(),
      total: z.number().optional(),
      totalText: z.string().optional(),
    })
    .optional(),
  contractRef: z.string().optional(),
  createdAt: z.string().optional(),
  templateRef: TemplateRefSchema.optional(),
  status: z.enum(['draft', 'generating', 'ready', 'failed']).optional(),
});

export type ActDocument = z.infer<typeof ActDocumentSchema>;

// Bankers rounding (round half to even)
function roundBankers(value: number, decimals = 2) {
  const factor = Math.pow(10, decimals);
  const n = value * factor;
  const floor = Math.floor(n);
  const diff = n - floor;
  // tie case
  if (Math.abs(diff - 0.5) < 1e-8) {
    const even = floor % 2 === 0 ? floor : floor + 1;
    return even / factor;
  }
  return Math.round(n) / factor;
}

function amountToWords(n: number) {
  // Minimal placeholder: localized textual representation can be replaced with a proper lib
  return `${n.toFixed(2)} грн`;
}

// Calculate derived totals server-side and validate
export function calculateTotals(raw: ActDocument): ActDocument {
  const items = raw.items.map((it) => {
    const total = roundBankers(it.quantity * it.unitPrice, 2);
    return { ...it, total };
  });

  const subtotal = roundBankers(
    items.reduce((s, it) => s + (it.total ?? 0), 0),
    2,
  );
  const total = subtotal;
  const totals = { subtotal, total, totalText: amountToWords(total) };

  const out = { ...raw, items, totals };

  // Final server-side validation — throws on invalid data
  return ActDocumentSchema.parse(out);
}
