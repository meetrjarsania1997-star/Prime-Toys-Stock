
import { User, StockItem } from '../types';

const USERS_KEY = 'prime_toys_users';
const STOCKS_PREFIX = 'prime_toys_stocks_';

export const storageService = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUser: (user: User) => {
    const users = storageService.getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getStocks: (userId: string): StockItem[] => {
    const data = localStorage.getItem(`${STOCKS_PREFIX}${userId}`);
    return data ? JSON.parse(data) : [];
  },

  saveStock: (userId: string, item: StockItem) => {
    const stocks = storageService.getStocks(userId);
    stocks.push(item);
    localStorage.setItem(`${STOCKS_PREFIX}${userId}`, JSON.stringify(stocks));
  }
};
