import React, { useState } from 'react';

interface Props {
  onBack: () => void;
  onSubmit: (client: { name: string; mobile: string; email: string }) => void;
  isSubmitting: boolean;
}

const Step4ClientForm: React.FC<Props> = ({ onBack, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, mobile, email });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-center">Enter Your Details</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Mobile *</label>
          <input
            type="text"
            required
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button type="button" onClick={onBack} className="text-blue-500 hover:underline">
            ← Back
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-5 py-2 rounded-full hover:bg-pink-600 transition"
          >
            {isSubmitting ? 'Booking...' : 'Confirm'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step4ClientForm;
