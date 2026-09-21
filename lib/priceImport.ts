/** Разбор листа Excel с каталогом: колонки title, description, price, image, details. */

export type ProductRow = {
  title: string;
  description: string;
  price: number | null;
  image?: string;
  details: string;
};

export type RowError = { row: number; reason: string };

function text(value: unknown): string {
  return value === undefined || value === null ? '' : String(value).trim();
}

/** «1 250,50», «1250.5», 1250 → число; пусто → null; всё остальное — ошибка. */
function parsePrice(value: unknown): number | null | undefined {
  if (typeof value === 'number') return Number.isFinite(value) && value >= 0 ? value : undefined;
  const raw = text(value).replace(/\s/g, '').replace(',', '.');
  if (raw === '') return null;
  const price = Number(raw);
  return Number.isFinite(price) && price >= 0 ? price : undefined;
}

/**
 * Разбирает лист целиком до того, как трогать базу.
 * Номер строки — как в Excel: первая строка листа занята заголовками.
 */
export function parseRows(rows: Record<string, unknown>[]): { products: ProductRow[]; errors: RowError[] } {
  const products: ProductRow[] = [];
  const errors: RowError[] = [];

  rows.forEach((row, index) => {
    const excelRow = index + 2;
    const title = text(row.title);
    const price = parsePrice(row.price);

    if (!title) {
      errors.push({ row: excelRow, reason: 'нет названия (title)' });
      return;
    }
    if (price === undefined) {
      errors.push({ row: excelRow, reason: `цена не число: «${text(row.price)}»` });
      return;
    }

    const image = text(row.image);
    products.push({
      title,
      description: text(row.description),
      price,
      // Пустая ячейка не должна затирать картинку-заглушку из схемы
      ...(image ? { image } : {}),
      details: text(row.details),
    });
  });

  return { products, errors };
}
