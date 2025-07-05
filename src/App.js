import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/services')  // твій Spring endpoint
      .then(res => setServices(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedService) {
      axios.get('http://localhost:8080/api/appointments?service=${selectedService}')
        .then(res => setAppointments(res.data))
        .catch(err => console.error(err));
    }
  }, [selectedService]);

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      <div style={{ marginRight: '20px' }}>
        <h3>Choose Date</h3>
        <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
      </div>

      <div>
        <h3>Select Service</h3>
        <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
          <option value="">--Select Service--</option>
          {services.map(s => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <h4>Appointments</h4>
        <table border="1">
          <thead>
            <tr>
              <th>DateTime</th>
              <th>Client</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => (
              <tr key={i}>
                <td>{a.dateTime}</td>
                <td>{a.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;