import React from 'react';

function StoringSelectie({ machineKey, onStoringGekozen }) {
  // Dynamisch alle afbeeldingen importeren uit de juiste map
  const importImages = require.context(
    `./assets/machines/${machineKey}`,
    false,
    /\.(png|jpe?g|jpeg|svg)$/
  );

  const afbeeldingen = importImages.keys().map((path) => {
    const naam = path
      .replace('./', '')
      .replace(/\.[^/.]+$/, '')
      .replaceAll('-', ' ');
    return {
      titel: naam,
      src: importImages(path)
    };
  });

  // Voeg 'Other' toe als extra tegel
  const storingen = [...afbeeldingen, { titel: 'Other', src: null }];

  return (
    <div>
      <h2>Kies storing voor: {machineKey}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {storingen.map((storing, index) => (
          <div
            key={index}
            onClick={() => onStoringGekozen(storing)}
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#eee',
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

export default StoringSelectie;
