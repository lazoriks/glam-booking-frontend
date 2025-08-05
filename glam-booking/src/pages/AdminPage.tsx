import React, { useEffect, useState, useCallback } from "react";

type Appointment = {
  id: number;
  datatime: string;
  client: { firstName: string; surname: string; mobile: string };
  master: { firstName: string; surname: string };
  services: { serviceName: string }[];
};

type Service = {
  id: number;
  serviceName: string;
  price: number;
  period: number;
};

type Master = {
  id: number;
  firstName: string;
  surname: string;
};

type Client = {
  id: number;
  firstName: string;
  surname: string;
  mobile: string;
  email: string;
};

type Tab = "appointments" | "services" | "masters" | "clients";

const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [tab, setTab] = useState<Tab>("appointments");

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const [fromDate, setFromDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(() => new Date().toISOString().split("T")[0]);

  const API = "https://appointmentspring-206160864813.us-central1.run.app/api/admin";

  const fetchData = useCallback(() => {
    if (!authenticated) return;

    if (tab === "appointments") {
      fetch(`${API}/appointments?from=${fromDate}&to=${toDate}`)
        .then((res) => res.json())
        .then(setAppointments);
    } else if (tab === "services") {
      fetch(`${API}/services`).then((res) => res.json()).then(setServices);
    } else if (tab === "masters") {
      fetch(`${API}/masters`).then((res) => res.json()).then(setMasters);
    } else if (tab === "clients") {
      fetch(`${API}/clients`).then((res) => res.json()).then(setClients);
    }
  }, [tab, fromDate, toDate, authenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!authenticated) {
    return (
      <div className="p-6 max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          onClick={() => {
            if (login === "admin" && password === "Beauty2025") {
              setAuthenticated(true);
            } else {
              alert("Invalid credentials");
            }
          }}
          className="w-full bg-black text-white py-2 rounded hover:bg-pink-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex gap-4 mb-6">
        {["appointments", "services", "masters", "clients"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as Tab)}
            className={`px-4 py-2 rounded-full ${
              tab === t ? "bg-pink-600 text-white" : "bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* --- Filters for appointments --- */}
      {tab === "appointments" && (
        <div className="flex gap-4 mb-4 items-end">
          <div>
            <label>From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded p-2 ml-2"
            />
          </div>
          <div>
            <label>To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded p-2 ml-2"
            />
          </div>
          <button onClick={fetchData} className="px-4 py-2 bg-black text-white rounded-full">
            Filter
          </button>
        </div>
      )}

      {/* --- Data tables --- */}
      {tab === "appointments" && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Date</th>
                <th className="p-2">Client</th>
                <th className="p-2">Master</th>
                <th className="p-2">Services</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.id}>
                  <td className="border p-2">{a.datatime}</td>
                  <td className="border p-2">{a.client.firstName} {a.client.surname} ({a.client.mobile})</td>
                  <td className="border p-2">{a.master.firstName} {a.master.surname}</td>
                  <td className="border p-2">
                    {a.services.map((s) => s.serviceName).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "services" && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Price</th>
                <th className="p-2">Period</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td className="border p-2">{s.serviceName}</td>
                  <td className="border p-2">€{s.price}</td>
                  <td className="border p-2">{s.period} min</td>
                  <td className="border p-2 space-x-2">
                    <button className="text-blue-600">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "masters" && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">First Name</th>
                <th className="p-2">Surname</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {masters.map((m) => (
                <tr key={m.id}>
                  <td className="border p-2">{m.firstName}</td>
                  <td className="border p-2">{m.surname}</td>
                  <td className="border p-2 space-x-2">
                    <button className="text-blue-600">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "clients" && (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Mobile</th>
                <th className="p-2">Email</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td className="border p-2">{c.firstName} {c.surname}</td>
                  <td className="border p-2">{c.mobile}</td>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
