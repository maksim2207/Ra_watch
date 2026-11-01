import { useState } from 'react';
import type { ClockItem } from './types/clock';
import { WorldClockForm } from './components/WorldClockForm';
import { WorldClockList } from './components/WorldClockList';
import './App.css';

export default function App() {
  const [clocks, setClocks] = useState<ClockItem[]>([
    { id: '1', name: 'Moscow', timezone: 3 },
    { id: '2', name: 'London', timezone: 0 },
  ]);

  const handleAddClock = (name: string, timezone: number) => {
    const newClock: ClockItem = {
      id: crypto.randomUUID(),
      name,
      timezone,
    };
    setClocks((prev) => [...prev, newClock]);
  };

  const handleDeleteClock = (id: string) => {
    setClocks((prev) => prev.filter((clock) => clock.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Мировые часы</h1>
      <WorldClockForm onAddClock={handleAddClock} />
      <WorldClockList clocks={clocks} onDeleteClock={handleDeleteClock} />
    </div>
  );
}