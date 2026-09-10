'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({ name: '', address: '', scope: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Form submitted successfully!');
        setFormData({ name: '', address: '', scope: '' });
      } else {
        const errorData = await response.json();
        setStatus(`Submission failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('An error occurred during submission.');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Electrical Service Request</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem' }} />
        </div>
        <div>
          <label htmlFor="scope">Scope of Work:</label>
          <textarea id="scope" name="scope" value={formData.scope} onChange={handleChange} required style={{ width: '100%', padding: '0.5rem', minHeight: '100px' }} />
        </div>
        <button type="submit" style={{ padding: '0.75rem', cursor: 'pointer' }}>Submit Request</button>
      </form>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </main>
  );
}
