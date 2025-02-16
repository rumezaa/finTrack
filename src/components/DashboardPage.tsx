import React from 'react';

interface Purchases {
    id: number;
    name: string;
    price:number;
}

interface DashboardProps {
    monthlyGoal: number;
    spent: number;
    purchases: Purchases[];
}

export default function DashboardPage({ monthlyGoal, spent, purchases }: DashboardProps) {
    const progress = Math.min((spent / monthlyGoal) * 100, 100)
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
          {/* Header */}
          <h1 className="text-2xl font-bold mb-4 text-orange-500">Dashboard</h1>
    
          {/* Monthly Spending Section */}
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-gray-700">
              <span>Monthly Goal: ${monthlyGoal}</span>
              <span>Spent: ${spent}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full"
                style={{ width: `${progress}%`, backgroundColor: '#FF7043' }} // Grapefruit orange
              ></div>
            </div>
          </div>
    
          {/* Recent Purchases Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Recent Purchases</h2>
            {purchases.length === 0 ? (
              <p className="text-gray-500">No purchases yet.</p>
            ) : (
              // Only show the last 3 purchases
              purchases.slice(0, 3).map((purchase) => (
                <div key={purchase.id} className="flex justify-between border-b border-gray-200 py-2">
                  <span className="text-gray-700">{purchase.name}</span>
                  <span className="text-gray-700">${purchase.price}</span>
                </div>
              ))
            )}
          </div>
        </div>
      );
    }