import { useState, useEffect } from 'react';

export default function CardGame() {
  const [winningCard, setWinningCard] = useState(null);
  const [isWon, setIsWon] = useState(false);
  const [message, setMessage] = useState("Válassz egy kártyát!");
  const [attempts, setAttempts] = useState(0);

 
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setWinningCard(Math.floor(Math.random() * 5));
    setIsWon(false);
    setMessage("Válassz egy kártyát!");
    setAttempts(0);
  };

  const handleCardClick = (index) => {
    if (isWon) return;

    setAttempts(attempts + 1);

    if (index === winningCard) {
      setIsWon(true);
      setMessage(`Gratulálok! Eltaláltad a(z) ${attempts + 1}. próbálkozásra!`);
    } else {
      setMessage("Nem nyert... Próbáld újra!");
    }
  };

  return (
    <div className="app-card">
      <h2>Szerencsekártya - Találd el a kártyát!</h2>
      <p className={`status-msg ${isWon ? 'success' : ''}`}>{message}</p>
      
      <div className="card-container">
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`game-card ${isWon && i === winningCard ? 'winner' : ''}`}
            onClick={() => handleCardClick(i)}
          >
            {isWon && i === winningCard ? "🏆" : "?"}
          </div>
        ))}
      </div>

      {isWon && (
        <button className="reset-btn" onClick={resetGame}>Új játék</button>
      )}
    </div>
  );
}