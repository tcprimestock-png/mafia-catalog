"use client";
import React, { useState } from 'react';

const PRODUCTS = [
  { id: 1, name: "Extra Hot Mafia", price: 85, img: "/extra-hot.jpg" },
  { id: 2, name: "Mild Lemon", price: 75, img: "/mild-lemon.jpg" },
  { id: 3, name: "Garlic Infusion", price: 80, img: "/garlic.jpg" },
  { id: 4, name: "The Godfather", price: 95, img: "/godfather.jpg" },
];

export default function Home() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const PHONE = "27658886239"; 

  const update = (name: string, amt: number) => {
    setCart(prev => {
      const val = (prev[name] || 0) + amt;
      if (val <= 0) { const { [name]: _, ...rest } = prev; return rest; }
      return { ...prev, [name]: val };
    });
  };

  const total = PRODUCTS.reduce((s, p) => s + (cart[p.name] || 0) * p.price, 0);

  const send = () => {
    let msg = "🔥 *MAFIA ORDER* 🔥\n\n";
    Object.entries(cart).forEach(([n, q]) => msg += `• ${q}x ${n}\n`);
    window.location.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(msg + `\n*Total: R ${total}*`)}`;
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-black italic text-lime-500 uppercase">Mafia Chillies</h1>
      <div className="grid grid-cols-2 gap-4 pb-32 mt-6">
        {PRODUCTS.map(p => (
          <div key={p.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3">
            <div className="aspect-square bg-zinc-800 rounded-xl mb-3 overflow-hidden">
              <img src={p.img} className="w-full h-full object-cover" onError={(e)=>(e.currentTarget.src="https://via.placeholder.com/150")}/>
            </div>
            <h3 className="text-xs font-bold mb-2">{p.name}</h3>
            <div className="flex justify-between items-center">
              <span className="text-lime-500 font-bold text-sm">R{p.price}</span>
              <div className="flex items-center gap-2">
                <button onClick={()=>update(p.name, -1)} className="text-white">-</button>
                <span className="text-xs">{cart[p.name] || 0}</span>
                <button onClick={()=>update(p.name, 1)} className="bg-white text-black w-5 h-5 rounded-full font-bold">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {total > 0 && (
        <button onClick={send} className="fixed bottom-6 left-6 right-6 bg-lime-500 text-black p-4 rounded-2xl font-black uppercase shadow-xl">
          Order for R {total}
        </button>
      )}
    </main>
  );
}
