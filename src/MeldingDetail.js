import React, { useState } from 'react';

function MeldingDetail({ melding, onTerug }) {
  const [oplossing, setOplossing] = useState('');
  const [status, setStatus] = useState('open');
  const [extraBestand, setExtraBestand] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('💾 Melding bijgewerkt:');
    console.log('Status:', status);
    console.log('Oplossing:', oplossing);
    console.log('Extra bestand:', extraBestand);
    alert('Melding bijgewerkt! (simulatie)');
    onTerug(); // terug naar overzicht
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Details voor melding: {melding.storing}</h2>

      <div style={{ marginBottom: 20 }}>
        <p><strong>Machine:</strong> {melding.machine}</p>
        <p><strong>Melder:</strong> {melding.melder}</p>
        <p><strong>Urgentie:</strong> {melding.urgentie}</p>
        <p><strong>Datum/tijd:</strong> {melding.datumTijd}</p>
        <p><strong>Omschrijving:</strong> {melding.extraInfo}</p>
        {melding.afbeelding && (
          <img
            src={melding.afbeelding}
            alt="Melding"
            style={{ width: 200, borderRadius: 8, marginTop: 10 }}
          />
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <label>
          Hoe is het opgelost?
          <textarea
            value={oplossing}
            onChange={(e) => setOplossing(e.target.value)}
            rows={4}
            placeholder="Beschrijf hoe je het probleem hebt opgelost"
            required
          />
        </label>

        <label>
          Extra foto of video (optioneel):
          <input type="file" accept="image/*,video/*" onChange={(e) => setExtraBestand(e.target.files[0])} />
        </label>

        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in behandeling">In behandeling</option>
            <option value="opgelost">Opgelost</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: 10 }}>
          <button type="submit">✅ Opslaan</button>
          <button type="button" onClick={onTerug}>← Terug</button>
        </div>
      </form>
    </div>
  );
}

export default MeldingDetail;
