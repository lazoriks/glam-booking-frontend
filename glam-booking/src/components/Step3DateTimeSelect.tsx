import React, { useEffect, useState } from 'react';

// Типи даних
interface Master {
  id: number;
  firstName: string;
  surname: string;
}

interface AvailableDayDto {
  date: string; // формат YYYY-MM-DD
  times: string[]; // ['13:00', '13:15', ...]
}

interface Service {
  id: number;
  serviceName: string;
  price: number;
  period: number;
  description?: string;
}

interface Props {
  groupId: number;
  services: Service[];
  onBack: () => void;
  onSelect: (masterId: number, datetime: string) => void;
}

const Step3DateTimeSelect: React.FC<Props> = ({ groupId, services, onBack, onSelect }) => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [masterId, setMasterId] = useState<number | null>(null);
  const [available, setAvailable] = useState<AvailableDayDto[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Завантаження майстрів
  useEffect(() => {
    fetch('https://appointmentspring-206160864813.us-central1.run.app/api/masters')
      .then(res => res.json())
      .then(setMasters)
      .catch(err => console.error('Failed to load masters', err));
  }, []);

  // Завантаження доступності
  useEffect(() => {
    if (!masterId) return;
    fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/appointments/available?masterId=${masterId}`)
      .then(res => res.json())
      .then(setAvailable)
      .catch(err => console.error('Failed to load slots', err));
  }, [masterId]);

  const handleBook = () => {
    if (masterId && selectedDate && selectedTime) {
      const datetime = `${selectedDate}T${selectedTime}`;
      onSelect(masterId, datetime);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center">Select Date & Time</h2>

      {/* Назад */}
      <button
        onClick={onBack}
        className="text-sm text-blue-500 hover:underline mb-2"
      >
        ← Back
      </button>

      {/* Вибір майстра */}
      <div className="flex flex-col gap-2">
        <label className="font-semibold">Choose Master:</label>
        <select
          className="border rounded p-2"
          value={masterId || ''}
          onChange={e => {
            setMasterId(Number(e.target.value));
            setSelectedDate('');
            setSelectedTime('');
          }}
        >
          <option value="">-- Select --</option>
          {masters.map(m => (
            <option key={m.id} value={m.id}>
              {m.firstName} {m.surname}
            </option>
          ))}
        </select>
      </div>

      {/* Вибір дати */}
      {available.length > 0 && (
        <div className="flex gap-2 overflow-x-auto py-2">
          {available.map((day) => (
            <button
              key={day.date}
              className={`px-4 py-2 rounded-full border text-sm min-w-max ${
                selectedDate === day.date ? 'bg-pink-500 text-white' : 'bg-white'
              }`}
              onClick={() => {
                setSelectedDate(day.date);
                setSelectedTime('');
              }}
            >
              {new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
            </button>
          ))}
        </div>
      )}

      {/* Вибір часу */}
      {selectedDate && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {available.find(d => d.date === selectedDate)?.times.map((time) => (
            <button
              key={time}
              className={`border rounded p-2 text-center ${
                selectedTime === time ? 'bg-pink-500 text-white' : ''
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      )}

      {/* Кнопка */}
      <div className="text-center pt-4">
        <button
          className="px-6 py-3 bg-black text-white rounded-full hover:bg-pink-600 transition"
          onClick={handleBook}
          disabled={!selectedDate || !selectedTime || !masterId}
        >
          Book appointment
        </button>
      </div>
    </div>
  );
};

export default Step3DateTimeSelect;
