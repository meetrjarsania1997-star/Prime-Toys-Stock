
export interface User {
  id: string;
  username: string;
  password?: string;
}

export interface StockItem {
  id: string;
  userId: string;
  itemName: string;
  itemCode: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  stockValue: number;
  createdAt: number;
}

export type View = 'HOME' | 'LOGIN' | 'SIGNUP' | 'ADD_STOCK' | 'STOCK_LIST';
