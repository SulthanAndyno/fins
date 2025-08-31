import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Trash2, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const TransactionHistory = ({ transactions, deleteTransaction }) => {
  if (transactions.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-6">Riwayat Transaksi</h2>
        <p className="text-gray-500">Belum ada transaksi yang tercatat.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-text-dark mb-6">Riwayat Transaksi</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {transactions.map(t => (
            <li key={t.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
              <div className="flex items-center">
                 {t.type === 'income' 
                   ? <ArrowUpCircle className="text-secondary mr-4" size={24}/> 
                   : <ArrowDownCircle className="text-red-500 mr-4" size={24}/>
                 }
                 <div>
                   <p className="font-semibold text-text-dark">{t.category}</p>
                   <p className="text-sm text-gray-500">{format(new Date(t.date), 'dd MMMM yyyy', { locale: id })}</p>
                 </div>
              </div>
              <div className="flex items-center">
                <p className={`font-bold text-lg ${t.type === 'income' ? 'text-secondary' : 'text-red-500'}`}>
                  {t.type === 'income' ? '+' : '-'}Rp {t.amount.toLocaleString('id-ID')}
                </p>
                <button onClick={() => deleteTransaction(t.id)} className="ml-4 text-gray-400 hover:text-red-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionHistory;