import { useEffect, useState } from 'react';

export default function QrGenerator() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (word) {

      setQrCode(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(word)}&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
  }, [word, size, bgColor]);

  function handleClick() {
    setWord(temp);
  }

  return (
    <div className="app-card">
      <h1>QR Code Generátor</h1>
      <div className="input-box">
        <div className="gen">
          <input
            type="text"
            onChange={(e) => setTemp(e.target.value)}
            placeholder="Szöveg helye..."
          />
          <button onClick={handleClick}>Generálás</button>
        </div>
        <div className="extra">
          <h5>Háttérszín:</h5>
          <input
            type="color"
            onChange={(e) => setBgColor(e.target.value.substring(1))}
          />
          <h5>Méret:</h5>
          <input
            type="range"
            min="200"
            max="600"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
      </div>

      <div className="output-box" style={{marginTop: '20px'}}>
        {qrCode && <img src={qrCode} alt="Generated QR Code" style={{border: '1px solid #ccc'}} />}
        <br />
        {qrCode && (
          <a href={qrCode} download="QRCode">
            <button type="button">Letöltés</button>
          </a>
        )}
      </div>
    </div>
  );
}