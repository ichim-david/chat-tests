import React, { useState } from 'react';

const WaterLogger: React.FC = () => {
  const [waterIntake, setWaterIntake] = useState<number>(0);
  const [log, setLog] = useState<number[]>([]);
  const [customAmount, setCustomAmount] = useState<string>('');

  const handleAddWater = (amount: number) => {
    setWaterIntake(prevIntake => prevIntake + amount);
    setLog(prevLog => [...prevLog, amount]);
  };

  const handleCustomAmount = () => {
    const amount = parseInt(customAmount);
    if (amount > 0) {
      handleAddWater(amount);
      setCustomAmount('');
    }
  };

  const handleReset = () => {
    setWaterIntake(0);
    setLog([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
      <h1 className="text-3xl font-bold mb-4">Water Logger</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl mb-2">Total Water Intake: {waterIntake} ml</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleAddWater(250)}
            aria-label="Add 250 ml"
          >
            Add 250 ml
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleAddWater(500)}
            aria-label="Add 500 ml"
          >
            Add 500 ml
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleReset}
            aria-label="Reset water intake"
          >
            Reset
          </button>
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Custom amount (ml)"
            className="border rounded px-3 py-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded ml-2"
            onClick={handleCustomAmount}
            aria-label="Add custom amount"
          >
            Add
          </button>
        </div>
        <h3 className="text-lg">Log:</h3>
        <ul className="list-disc pl-5">
          {log.map((amount, index) => (
            <li key={index}>{amount} ml</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WaterLogger;
