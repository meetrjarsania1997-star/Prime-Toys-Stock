
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
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-2xl rounded-[3rem] shadow-2xl p-8 md:p-12 border border-white/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-4">
              <span>📋</span> Warehouse
            </h2>
            <p className="text-gray-700 font-bold mt-2">Managing {stocks.length} toys in the magic vault</p>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={downloadPDF}
              disabled={stocks.length === 0}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black transition-all shadow-lg ${
                stocks.length === 0 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:scale-105 active:scale-95'
              }`}
            >
              <span>📥</span> Export PDF
            </button>
            <button
              onClick={() => setView('ADD_STOCK')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <span>➕</span> Add More
            </button>
          </div>
        </div>

        {stocks.length === 0 ? (
          <div className="text-center py-24 bg-blue-50/50 rounded-[3rem] border-4 border-dashed border-blue-100">
            <div className="text-8xl mb-6">📦</div>
            <h3 className="text-3xl font-black text-gray-800">Warehouse Empty!</h3>
            <p className="text-gray-600 font-bold mb-10 max-w-md mx-auto">No toys found. Let's start stocking up your magic store!</p>
            <button
              onClick={() => setView('ADD_STOCK')}
              className="px-10 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 shadow-xl transition-all"
            >
              Add Your First Toy
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-[2.5rem] border border-gray-100 shadow-2xl bg-white/40">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-[0.2em] rounded-tl-[2.5rem]">Item Name</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-[0.2em]">Code</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-[0.2em] text-right">Purchase (₹)</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-[0.2em] text-right">Selling (₹)</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-[0.2em] text-center">Qty</th>
                  <th className="px-8 py-6 font-black uppercase text-xs tracking-[0.2em] text-right rounded-tr-[2.5rem]">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {stocks.map((item, idx) => (
                  <tr 
                    key={item.id} 
                    className={`hover:bg-blue-50/70 transition-colors group ${idx % 2 === 0 ? 'bg-white/60' : 'bg-blue-50/30'}`}
                  >
                    <td className="px-8 py-5 font-black text-gray-900 group-hover:text-blue-700">{item.itemName}</td>
                    <td className="px-8 py-5">
                      <span className="px-4 py-1.5 bg-gray-200 text-gray-700 rounded-full text-[10px] font-black border border-gray-300 shadow-sm">
                        {item.itemCode}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right font-bold text-gray-500">₹{item.purchasePrice.toLocaleString()}</td>
                    <td className="px-8 py-5 text-right text-gray-900 font-black">₹{item.sellingPrice.toLocaleString()}</td>
                    <td className="px-8 py-5 text-center">
                      <span className={`px-5 py-2 rounded-2xl text-xs font-black shadow-sm ${
                        item.quantity < 5 ? 'bg-red-500 text-white animate-pulse' : 'bg-green-100 text-green-700'
                      }`}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right text-blue-700 font-black text-lg">₹{item.stockValue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-white/95">
                  <td colSpan={5} className="px-8 py-8 text-right font-black text-gray-400 uppercase tracking-widest rounded-bl-[2.5rem]">Grand Total Inventory Value:</td>
                  <td className="px-8 py-8 text-right font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-800 rounded-br-[2.5rem]">
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
