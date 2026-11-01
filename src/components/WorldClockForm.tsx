import { useState } from 'react';

interface WorldClockFormProps {
    onAddClock: (name: string, timezone: number) => void;
}

export const WorldClockForm = ({ onAddClock }: WorldClockFormProps) => {
    const [name, setName] = useState('');
    const [timezone, setTimezone] = useState('');

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!name.trim() || timezone.trim() === '') return;

        const tzNumber = parseFloat(timezone);
        if (isNaN(tzNumber)) return;

        onAddClock(name.trim(), tzNumber);
        setName('');
        setTimezone('');
    };

    return (
        <form className="clock-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Название</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="например, Moscow"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="timezone">Временная зона (UTC)</label>
                <input
                    id="timezone"
                    type="number"
                    step="0.5"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    placeholder="например, 3 или -5"
                    required
                />
            </div>

            <button type="submit" className="btn-add">
                Добавить
            </button>
        </form>
    );
};