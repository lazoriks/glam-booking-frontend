import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface Props {
  onBack: () => void;
  onSubmit: (client: {
    name: string;
    surname: string;
    mobile: string;
    email: string;
    googleId?: string;
  }) => void;
  isSubmitting: boolean;
}

interface GoogleUser {
  given_name: string;
  family_name: string;
  email: string;
  sub: string;
}

const Step4ClientForm: React.FC<Props> = ({ onBack, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [googleId, setGoogleId] = useState<string | undefined>();

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('clientData');
    if (saved) {
      const data = JSON.parse(saved);
      setName(data.name || '');
      setSurname(data.surname || '');
      setMobile(data.mobile || '');
      setEmail(data.email || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const client = { name, surname, mobile, email, googleId };
    localStorage.setItem('clientData', JSON.stringify(client));
    onSubmit(client);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (!credentialResponse.credential) return;
    const decoded = jwtDecode<GoogleUser>(credentialResponse.credential);
    setName(decoded.given_name);
    setSurname(decoded.family_name);
    setEmail(decoded.email);
    setGoogleId(decoded.sub);
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
          <label className="block font-medium">Surname</label>
          <input
            type="text"
            value={surname}
            onChange={e => setSurname(e.target.value)}
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

        <div className="pt-4">
          <div className="text-center font-semibold text-gray-500 pb-2">OR</div>
          <div className="flex justify-center mb-2">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log("Login Failed")} />
          </div>
          <div className="border-t-2 border-gray-200 mb-4" />
        </div>

        <div className="flex justify-between pt-2">
          <button
            type="button"
            onClick={onBack}
            className="text-blue-500 hover:underline"
          >
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
