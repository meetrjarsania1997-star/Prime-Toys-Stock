import React, { useState, useEffect } from 'react';
import { User, StockItem, View } from '../types';
import { storageService } from '../services/storageService';

interface StockListProps {
  currentUser: User;
  setView: (view: View) => void;
}

const StockList: React.FC<StockListProps> = ({ currentUser, setView }) => {
  const [stocks, setStocks] = useState<StockItem[]>([]);

  useEffect(() => {
    const data = storageService.getStocks(currentUser.id);
    const sorted = [...data].sort((a, b) => a.itemCode.localeCompare(b.itemCode, undefined, { numeric: true }));
    setStocks(sorted);
  }, [currentUser.id]);

  const downloadPDF = () => {
    // @ts-ignore
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setTextColor(37, 99, 235);
    doc.text('PRIME TOYS - Inventory Report', 14, 22);
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Generated for: ${currentUser.username}`, 14, 32);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 38);

    const tableColumn = [
      "Item Name", 
      "Item Code", 
      "Purchase Price (₹)", 
      "Selling Price (₹)", 
      "Quantity", 
      "Stock Value (₹)"
    ];
    
    const tableRows = stocks.map(item => [
      item.itemName,
      item.itemCode,
      `INR ${item.purchasePrice}`,
      `INR ${item.sellingPrice}`,
      item.quantity,
      `INR ${item.stockValue}`
    ]);

    // @ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], textColor: [255, 255, 255] },
      styles: { cellPadding: 3, fontSize: 10 },
      columnStyles: {
        2: { halign: 'right' },
        3: { halign: 'right' },
        4: { halign: 'center' },
        5: { halign: 'right' },
      }
    });

    doc.save(`PrimeToys_Inventory_${currentUser.username}.pdf`);
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl p-8 md:p-12 border border-white/40 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-black text-blue-600 flex items-center gap-3">
              <span>📋</span> Stock Inventory
            </h2>
            <p className="text-gray-500 font-medium">Viewing {stocks.length} magic toys in storage</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={downloadPDF}
              disabled={stocks.length === 0}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                stocks.length === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-purple-600 text-white shadow-lg hover:bg-purple-700 active:scale-95'
              }`}
            >
              <span>📥</span> Download PDF
            </button>
            <button
              onClick={() => setView('ADD_STOCK')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all active:scale-95"
            >
              <span>➕</span> Add More
            </button>
          </div>
        </div>

        {stocks.length === 0 ? (
          <div className="text-center py-20 bg-blue-50/50 rounded-[2rem] border-2 border-dashed border-blue-100">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-bold text-gray-800">Your stock is empty!</h3>
            <p className="text-gray-500 mb-6">Time to add some amazing toys to your collection.</p>
            <button
              onClick={() => setView('ADD_STOCK')}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider rounded-tl-3xl">Item Name</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider">Item Code</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider text-right">Purchase Price (₹)</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider text-right">Selling Price (₹)</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider text-center">Quantity</th>
                  <th className="px-6 py-5 font-bold uppercase text-xs tracking-wider text-right rounded-tr-3xl">Stock Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stocks.map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/20'}`}
                  >
                    <td className="px-6 py-4 font-bold text-gray-800">{item.itemName}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold border border-gray-200">
                        {item.itemCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-gray-600 font-medium">₹{item.purchasePrice.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-gray-800 font-bold">₹{item.sellingPrice.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                        item.quantity < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-blue-600 font-black">₹{item.stockValue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50/80">
                  <td colSpan={5} className="px-6 py-5 text-right font-bold text-gray-500 rounded-bl-3xl">Total Inventory Value:</td>
                  <td className="px-6 py-5 text-right font-black text-2xl text-blue-700 rounded-br-3xl">
                    ₹{stocks.reduce((acc, curr) => acc + curr.stockValue, 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockList;