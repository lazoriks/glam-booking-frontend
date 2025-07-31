import React from 'react';

type Props = {
  onDone: () => void;
};

const SuccessMessage: React.FC<Props> = ({ onDone }) => (
  <div className="text-center py-10 px-6">
    <h2 className="text-2xl font-bold text-green-600 mb-4">Appointment Booked! 🎉</h2>
    <p className="text-gray-700 mb-6">Thank you. We’ll contact you if needed.</p>
    <button
      onClick={onDone}
      className="px-6 py-2 bg-black text-white rounded-full hover:bg-pink-600 transition"
    >
      OK
    </button>
  </div>
);

export default SuccessMessage;
