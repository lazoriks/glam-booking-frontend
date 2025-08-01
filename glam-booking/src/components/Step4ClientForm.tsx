import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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

interface GoogleTokenPayload {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
}

const Step4ClientForm: React.FC<Props> = ({ onBack, onSubmit, isSubmitting }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [googleId, setGoogleId] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, surname, mobile, email, googleId });
  };

  const handleGoogleLogin = (response: any) => {
    try {
      const decoded = jwtDecode<GoogleTokenPayload>(response.credential);
      setName(decoded.given_name || '');
      setSurname(decoded.family_name || '');
      setEmail(decoded.email || '');
      setGoogleId(decoded.sub); // Унікальний ID користувача Google
    } catch (err) {
      console.error('Invalid Google token', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-xl font-bold text-center">Enter Your Details</h2>

      {/* Google Login */}
      <div id="google-login" className="flex justify-center">
        <div
          className="g_id_signin"
          data-type="standard"
          data-size="large"
          data-theme="outline"
          data-text="signin_with"
          data-shape="pill"
          data-logo_alignment="left"
        ></div>
      </div>

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
            required
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

      {/* Load Google script and setup callback */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.handleGoogleLogin = ${handleGoogleLogin.toString()};
          window.onload = function () {
            google.accounts.id.initialize({
              client_id: "${process.env.REACT_APP_GOOGLE_CLIENT_ID}",
              callback: handleGoogleLogin
            });
            google.accounts.id.renderButton(
              document.getElementById("google-login"),
              { theme: "outline", size: "large" }
            );
          };
        `,
        }}
      />
    </div>
  );
};

export default Step4ClientForm;
