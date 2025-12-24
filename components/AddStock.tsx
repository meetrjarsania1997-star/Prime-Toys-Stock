import React, { useState, useEffect, useRef } from 'react';
import { User, StockItem, View } from '../types';
import { storageService } from '../services/storageService';

interface AddStockProps {
  currentUser: User;
  setView: (view: View) => void;
}

const AddStock: React.FC<AddStockProps> = ({ currentUser, setView }) => {
  const initialFormState = {
    itemName: '',
    itemCode: '',
    purchasePrice: '',
    sellingPrice: '',
    quantity: '',
    stockValue: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [lastAddedItem, setLastAddedItem] = useState<StockItem | null>(null);
  const [error, setError] = useState('');
  
  const itemNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const pp = parseFloat(formData.purchasePrice) || 0;
    const qty = parseInt(formData.quantity) || 0;
    setFormData(prev => ({ ...prev, stockValue: (pp * qty).toString() }));
  }, [formData.purchasePrice, formData.quantity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { itemName, itemCode, purchasePrice, sellingPrice, quantity, stockValue } = formData;

    if (!itemName || !itemCode || !purchasePrice || !sellingPrice || !quantity) {
      setError('All fields are required');
      return;
    }

    const newItem: StockItem = {
      id: Date.now().toString(),
      userId: currentUser.id,
      itemName,
      itemCode,
      purchasePrice: parseFloat(purchasePrice),
      sellingPrice: parseFloat(sellingPrice),
      quantity: parseInt(quantity),
      stockValue: parseFloat(stockValue),
      createdAt: Date.now()
    };

    storageService.saveStock(currentUser.id, newItem);
    setLastAddedItem(newItem);
    setFormData(initialFormState);
    itemNameRef.current?.focus();
  };

  return (
    <div className="flex-1 p-6 md:p-12 overflow-y-auto pb-24">
      <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl p-8 md:p-12 border border-green-50 mb-10">
        <div className="flex items-center space-x-4 mb-10">
          <div className="p-4 bg-green-100 rounded-3xl text-3xl">🧸</div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Add New Arrival</h2>
            <p className="text-gray-500">Add fresh toys to your amazing inventory</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Item Name</label>
            <input
              ref={itemNameRef}
              name="itemName"
              type="text"
              value={formData.itemName}
              onChange={handleInputChange}
              placeholder="e.g. Remote Control Car"
              className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Item Code</label>
            <input
              name="itemCode"
              type="text"
              value={formData.itemCode}
              onChange={handleInputChange}
              placeholder="e.g. T-123"
              className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Purchase Price (₹)</label>
            <input
              name="purchasePrice"
              type="number"
              value={formData.purchasePrice}
              onChange={handleInputChange}
              placeholder="0.00"
              className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Selling Price (₹)</label>
            <input
              name="sellingPrice"
              type="number"
              value={formData.sellingPrice}
              onChange={handleInputChange}
              placeholder="0.00"
              className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
            <input
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent focus:border-green-400 focus:bg-white rounded-2xl outline-none transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-2">Stock Value</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
              <input
                name="stockValue"
                type="number"
                readOnly
                value={formData.stockValue}
                className="w-full pl-10 pr-5 py-3 bg-blue-50/50 border-2 border-dashed border-blue-200 text-blue-700 font-bold rounded-2xl outline-none"
              />
            </div>
          </div>

          {error && <p className="md:col-span-2 text-red-500 text-sm font-medium text-center">{error}</p>}

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => setView('HOME')}
              className="flex-1 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-[2] py-4 bg-green-500 text-white font-bold rounded-2xl shadow-lg shadow-green-100 hover:bg-green-600 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              Submit Item
            </button>
          </div>
        </form>
      </div>

      {lastAddedItem && (
        <div className="max-w-2xl mx-auto bg-blue-50/80 backdrop-blur-sm rounded-3xl p-6 border-2 border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-blue-700 font-bold flex items-center gap-2">
              <span className="text-xl">✨</span> Recently Added
            </h3>
            <span className="text-xs font-bold bg-green-500 text-white px-3 py-1 rounded-full uppercase tracking-widest">Saved</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Item Name</p>
              <p className="text-gray-800 font-bold truncate">{lastAddedItem.itemName}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Code</p>
              <p className="text-gray-800 font-bold">{lastAddedItem.itemCode}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Quantity</p>
              <p className="text-gray-800 font-bold">{lastAddedItem.quantity} units</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Purchase Price</p>
              <p className="text-gray-800 font-bold">₹{lastAddedItem.purchasePrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Selling Price</p>
              <p className="text-gray-800 font-bold">₹{lastAddedItem.sellingPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Value</p>
              <p className="text-blue-600 font-black">₹{lastAddedItem.stockValue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStock;