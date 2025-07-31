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

  const [weekIndex, setWeekIndex] = useState(0); // index of 7-day page

  useEffect(() => {
    fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/masters/group/${groupId}`)
      .then(res => res.json())
      .then(setMasters)
      .catch(console.error);
  }, [groupId]);

  useEffect(() => {
    if (!selectedMaster) return;
    const query = `masterId=${selectedMaster}&serviceIds=${services.map(s => s.id).join(",")}`;
    fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/appointments/available?${query}`)
      .then(res => res.json())
      .then(data => {
        setAvailable(data);
        const today = new Date().toISOString().split("T")[0];
        if (data.some((d: AvailableDayDto) => d.date === today)) {
          setSelectedDate(today);
        } else {
          setSelectedDate(data[0]?.date ?? null);
        }
      })
      .catch(console.error);
  }, [selectedMaster, services]);

  const selectedDateTimes = available.find(day => day.date === selectedDate)?.times || [];

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return {
      day: d.getDate(),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    };
  };

  const paginatedDays = available.slice(weekIndex * 7, weekIndex * 7 + 7);

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      <button onClick={onBack} className="text-pink-600 font-medium text-xl">←</button>
      <h2 className="text-2xl font-bold text-center">Select time</h2>

      {/* Master select */}
      <div>
        <label className="block font-medium mb-2">Choose Master</label>
        <select
          className="w-full border rounded p-2"
          value={selectedMaster ?? ""}
          onChange={(e) => {
            setSelectedMaster(Number(e.target.value));
            setSelectedDate(null);
            setSelectedTime(null);
            setWeekIndex(0);
          }}
        >
          <option value="" disabled>-- Select --</option>
          {masters.map(m => (
            <option key={m.id} value={m.id}>{m.firstName} {m.surname}</option>
          ))}
        </select>
      </div>

      {/* Dates */}
      {selectedMaster && available.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={weekIndex === 0}
              onClick={() => setWeekIndex(prev => Math.max(0, prev - 1))}
              className="text-xl text-gray-500 hover:text-pink-600 disabled:opacity-30"
            >
              ←
            </button>

            <div className="flex overflow-x-auto gap-4 px-2">
              {paginatedDays.map(day => {
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
                        ? "bg-pink-600 text-white font-bold"
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
              disabled={(weekIndex + 1) * 7 >= available.length}
              onClick={() => setWeekIndex(prev => prev + 1)}
              className="text-xl text-gray-500 hover:text-pink-600 disabled:opacity-30"
            >
              →
            </button>
          </div>

          {/* Time selection */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-3">
            {selectedDateTimes.map(time => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`p-3 rounded-md text-center border ${
                  selectedTime === time
                    ? "bg-pink-600 text-white border-pink-600"
                    : "hover:bg-pink-100"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Submit */}
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
