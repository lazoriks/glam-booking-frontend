import React, { useEffect, useState } from "react";

type Service = {
  id: number;
};

type Props = {
  groupId: number;
  services: Service[];
  onBack: () => void;
  onSelect: (masterId: number, datetime: string) => void;
};

type Master = {
  id: number;
  firstName: string;
  surname: string;
};

type AvailableDayDto = {
  date: string;
  times: string[];
};

const Step3DateTimeSelect: React.FC<Props> = ({ groupId, services, onBack, onSelect }) => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<number | null>(null);
  const [available, setAvailable] = useState<AvailableDayDto[]>([]);
  const [selectedDateTime, setSelectedDateTime] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/masters/group/${groupId}`)
      .then((res) => res.json())
      .then(setMasters)
      .catch(console.error);
  }, [groupId]);

  useEffect(() => {
    if (!selectedMaster) return;
    const query = `masterId=${selectedMaster}&serviceIds=${services.map(s => s.id).join(",")}`;
    fetch(`https://appointmentspring-206160864813.us-central1.run.app/api/appointments/available?${query}`)
      .then((res) => res.json())
      .then(setAvailable)
      .catch(console.error);
  }, [selectedMaster, services]);

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <button onClick={onBack} className="text-pink-600 font-medium">{'← Back'}</button>
      <h2 className="text-2xl font-bold text-center">Select Master & Time</h2>

      <div>
        <label className="block font-medium mb-2">Choose Master:</label>
        <select
          className="w-full border rounded p-2"
          value={selectedMaster ?? ""}
          onChange={(e) => {
            setSelectedMaster(Number(e.target.value));
            setSelectedDateTime(null);
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

      {selectedMaster && available.length > 0 && (
        <div>
          <label className="block font-medium mb-2">Choose Time:</label>
          <div className="space-y-4">
            {available.map(day => (
              <div key={day.date}>
                <p className="font-semibold mb-1">{day.date}</p>
                <div className="flex flex-wrap gap-2">
                  {day.times.map(time => {
                    const dateTimeStr = `${day.date}T${time}`;
                    return (
                      <button
                        key={time}
                        className={`px-3 py-1 rounded-full border ${
                          selectedDateTime === dateTimeStr
                            ? "bg-pink-500 text-white border-pink-500"
                            : "hover:bg-pink-100"
                        }`}
                        onClick={() => setSelectedDateTime(dateTimeStr)}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDateTime && (
        <div className="text-center mt-6">
          <button
            onClick={() => onSelect(selectedMaster!, selectedDateTime)}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-pink-600 transition"
          >
            Book appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default Step3DateTimeSelect;
