type Product = {
  title: string;
  price: string;
};

const data: Product[] = [
  { title: 'Caderno', price: '12.00' },
  { title: 'Mochila', price: '74.50' },
  { title: 'Lápis', price: '2.00' },
  { title: 'Borracha', price: '3.75' },
  { title: 'Caneta', price: '3.75' },
];

export const Product = {
  getAll: (): Product[] => {
    return data;
  },
  getFromPriceAfter: (price: number): Product[] => {
    return data.filter((item) => Number(item.price) > price);
  },
};
