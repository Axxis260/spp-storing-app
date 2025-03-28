import React, { useState } from 'react';
import MeldingDetail from './MeldingDetail';

function Scherm2StoringMelden({ machineKey, setGekozenStoring }) {
  const [gekozenMelding, setGekozenMelding] = useState(null);

  const lopendeMeldingen = [
    {
      storing: 'Klem X7',
      datumTijd: '25 maart 2025 10:55',
      machine: 'Packsize X7',
      melder: 'Rob',
      urgentie: 'Spoed',
      extraInfo: 'Hij doet het niet na omstellen.',
      afbeelding: require('./assets/machines/packsize-x7/klem-x7.jpeg')
    },
    {
      storing: 'Printer X7',
      datumTijd: '25 maart 2025 11:10',
      machine: 'Packsize X7',
      melder: 'Anna',
      urgentie: 'Normaal',
      extraInfo: 'Papier scheef ingevoerd.',
      afbeelding: null
    }
  ];

  // 🔧 Afbeeldingen ophalen uit juiste map
  let context;
  switch (machineKey) {
    case 'packsize-x7':
      context = require.context('./assets/machines/packsize-x7', false, /\.(png|jpe?g|jpeg|svg)$/);
      break;
    case 'packsize-x5':
      context = require.context('./assets/machines/packsize-x5', false, /\.(png|jpe?g|jpeg|svg)$/);
      break;
    default:
      context = null;
  }

  const storingen = context
    ? context.keys().map((key) => {
        const titel = key
          .replace('./', '')
          .replace(/\.[^/.]+$/, '')
          .replaceAll('-', ' ')
          .replaceAll('_', ' ')
          .replace(/\b\w/g, (char) => char.toUpperCase());
        return { titel, src: context(key) };
      })
    : [];

  const storingenMetOther = [...storingen, { titel: 'Andere storing', src: null }];

  const getAfbeeldingBijStoring = (titel) => {
    const gevonden = storingen.find((s) => s.titel.toLowerCase() === titel.toLowerCase());
    return gevonden?.src || null;
  };

  // 🔁 Als melding is gekozen → toon MeldingDetail
  if (gekozenMelding) {
    return (
      <MeldingDetail
        melding={gekozenMelding}
        onTerug={() => setGekozenMelding(null)}
      />
    );
  }

  return (
    <div>
      <h2>Storing melden voor: {machineKey.replaceAll('-', ' ').toUpperCase()}</h2>

      <h3>Lopende meldingen</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 30 }}>
        {lopendeMeldingen.map((melding, index) => {
          const afbeelding = getAfbeeldingBijStoring(melding.storing);
          return (
            <div
              key={index}
              onClick={() => setGekozenMelding(melding)}
              style={{
                cursor: 'pointer',
                width: 150,
                textAlign: 'center',
                border: '2px solid red',
                borderRadius: 12,
                padding: 10,
                backgroundColor: '#fff',
                boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
              }}
            >
              {afbeelding ? (
                <img
                  src={afbeelding}
                  alt={melding.storing}
                  style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 6 }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: 80,
                    background: '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 6,
                    fontStyle: 'italic'
                  }}
                >
                  Geen afbeelding
                </div>
              )}
              <p>{melding.storing}</p>
              <small>{melding.datumTijd}</small>
            </div>
          );
        })}
      </div>

      <h3>Kies een storing</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {storingenMetOther.map((storing, index) => (
          <div
            key={index}
            onClick={() => setGekozenStoring(storing)}
            style={{
              cursor: 'pointer',
              width: 150,
              textAlign: 'center',
              border: '1px solid #ccc',
              borderRadius: 12,
              padding: 10,
              backgroundColor: '#fff',
              boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            {storing.src ? (
              <img
                src={storing.src}
                alt={storing.titel}
                style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 6 }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: 80,
                  background: '#eee',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 6,
                  fontStyle: 'italic'
                }}
              >
                Geen afbeelding
              </div>
            )}
            <p>{storing.titel}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scherm2StoringMelden;
