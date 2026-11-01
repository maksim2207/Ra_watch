import type { ClockItem } from '../types/clock';
import { WorldClock } from './WorldClock';

interface WorldClockListProps {
    clocks: ClockItem[];
    onDeleteClock: (id: string) => void;
}

export const WorldClockList = ({ clocks, onDeleteClock }: WorldClockListProps) => {
    return (
        <div className="clock-list">
            {clocks.map((clock) => (
                <WorldClock key={clock.id} clock={clock} onDelete={onDeleteClock} />
            ))}
        </div>
    );
};