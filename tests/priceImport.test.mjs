import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseRows } from '../lib/priceImport.ts';

test('корректные строки превращаются в товары, цена понимает пробелы и запятую', () => {
  const { products, errors } = parseRows([
    { title: 'Лимонад «Sprint» 1,5 л', price: '1 250,50', description: '', image: '', details: '' },
    { title: '  Вода  ', price: 84 },
    { title: 'Квас', price: '' },
  ]);
  assert.deepEqual(errors, []);
  assert.deepEqual(products.map((p) => [p.title, p.price]), [
    ['Лимонад «Sprint» 1,5 л', 1250.5],
    ['Вода', 84],
    ['Квас', null],
  ]);
  assert.equal('image' in products[0], false, 'пустая картинка не затирает заглушку из схемы');
});

test('битые строки называются по номеру строки Excel', () => {
  const { products, errors } = parseRows([
    { title: 'Сок', price: 120 },
    { title: '', price: 50 },
    { title: 'Морс', price: 'договорная' },
    { title: 'Чай', price: -5 },
  ]);
  assert.equal(products.length, 1);
  assert.deepEqual(errors.map((e) => e.row), [3, 4, 5]);
  assert.match(errors[1].reason, /договорная/);
});

test('пустой лист не даёт ни товаров, ни ошибок — маршрут отклонит его отдельно', () => {
  assert.deepEqual(parseRows([]), { products: [], errors: [] });
});
