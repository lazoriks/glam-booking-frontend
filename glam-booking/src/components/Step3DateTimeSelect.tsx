import React, { useEffect, useState } from "react";

type Service = { id: number };
type Master = { id: number; firstName: string; surname: string };
type AvailableDayDto = { date: string; times: string[] };

type Props = {
  groupId: number;
  services: Service[];
  onBack: () => void;
  onSelect: (masterId: number, datetime: string) => void;
};

const Step3DateTimeSelect: React.FC<Props> = ({ groupId, services, onBack, onSelect }) => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
  const [available, setAvailable] = useState<AvailableDayDto[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/masters/group/${groupId}`)
      .then(res => res.json())
      .then(setMasters)
      .catch(console.error);
  }, [groupId]);

  useEffect(() => {
  if (!selectedMaster) return;

  fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/appointments/available?masterId=${selectedMaster}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        console.error("Expected array but got:", data);
        setAvailable([]);
        return;
      }

      setAvailable(data);

      const todayStr = new Date().toISOString().split("T")[0];
      const index = data.findIndex((d: AvailableDayDto) => d.date === todayStr);

      if (index >= 0) {
        setSelectedDate(todayStr);
        setPage(Math.floor(index / pageSize));
      } else {
        setSelectedDate(data[0]?.date ?? null);
        setPage(0);
      }
    })
    .catch(err => {
      console.error("Error fetching available slots:", err);
      setAvailable([]);
    });
}, [selectedMaster]);


  const selectedDateTimes = available.find(d => d.date === selectedDate)?.times || [];
  const pagedDates = available.slice(page * pageSize, (page + 1) * pageSize);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" })
    };
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <button onClick={onBack} className="text-pink-600 font-medium text-xl">←</button>
      <h2 className="text-2xl font-bold text-center">Select time</h2>

      <div>
        <label className="block font-medium mb-2">Choose Master</label>
        <select
          className="w-full border rounded p-2"
          value={selectedMaster ?? ""}
          onChange={(e) => {
            setSelectedMaster(Number(e.target.value));
            setSelectedDate(null);
            setSelectedTime(null);
          }}
        >
          <option value="" disabled>-- Select --</option>
          {masters.map(m => (
            <option key={m.id} value={m.id}>
              {m.firstName} {m.surname}
            </option>
          ))}
        </select>
      </div>

      {selectedMaster && pagedDates.length > 0 && (
        <>
          {/* Навігація по днях */}
          <div className="flex items-center justify-between my-4">
            <button
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Back
            </button>

            <div className="flex gap-2 overflow-x-auto">
              {pagedDates.map(day => {
                const { day: d, weekday } = formatDate(day.date);
                return (
                  <div
                    key={day.date}
                    onClick={() => {
                      setSelectedDate(day.date);
                      setSelectedTime(null);
                    }}
                    className={`min-w-[60px] p-2 rounded-full border text-center cursor-pointer ${
                      selectedDate === day.date
                        ? "bg-purple-600 text-white font-bold"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    <div className="text-sm">{d}</div>
                    <div className="text-xs">{weekday}</div>
                  </div>
                );
              })}
            </div>

            <button
              disabled={(page + 1) * pageSize >= available.length}
              onClick={() => setPage(p => p + 1)}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Часові слоти */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {selectedDateTimes.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-md text-center border ${
                  selectedTime === time
                    ? "bg-purple-600 text-white border-purple-600"
                    : "hover:bg-purple-100"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}

      {selectedMaster && selectedDate && selectedTime && (
        <div className="pt-6 text-center">
          <button
            onClick={() => onSelect(selectedMaster, `${selectedDate}T${selectedTime}`)}
            className="px-6 py-3 bg-black text-white rounded-full hover:bg-pink-600 transition"
          >
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Step3DateTimeSelect;
