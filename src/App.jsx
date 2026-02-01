import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css'; // Just in case, though we used index.css

// Phrases for the No button if they manage to click it or if we want to change text
const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  // Cap the size at 100px so it doesn't get too crazy
  const yesButtonSize = Math.min(noCount * 20 + 16, 100);

  function handleNoHover() {
    // Generate random position within safe bounds
    // We assume button width ~150px and height ~50px, add padding
    const safePadding = 50;
    // Random x between safePadding and width - safePadding - buttonWidth
    const newX = Math.random() * (window.innerWidth - safePadding * 2 - 100) + safePadding;
    const newY = Math.random() * (window.innerHeight - safePadding * 2 - 50) + safePadding;

    setNoBtnPos({ x: newX, y: newY });
    setNoCount(noCount + 1);
  }

  function handleYesClick() {
    setYesPressed(true);
    // Fire confetti
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const random = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
  }

  return (
    <div className="container">
      {yesPressed ? (
        <>
          <div className="img-container">
            <img src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" alt="Bear Kiss" />
          </div>
          <h1 className="text-4xl font-bold my-4">Yay!!! I love you! ❤️</h1>
        </>
      ) : (
        <>
          <div className="img-container">
            <img src="https://media.tenor.com/K_l0j21eAB8AAAAi/jump-bear.gif" alt="Cute Bear" />
          </div>
          <h1>Will you be my Valentine?</h1>
          <div className="buttons">
            <button
              className="yes-btn"
              style={{ fontSize: yesButtonSize }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <motion.button
              className="no-btn"
              style={noCount === 0 ? {} : { position: 'fixed', left: noBtnPos.x, top: noBtnPos.y }}
              animate={noCount === 0 ? {} : { x: 0, y: 0 }} // Reset transform, rely on left/top
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onHoverStart={handleNoHover}
              onClick={handleNoHover}
            >
              {noCount === 0 ? "No" : phrases[Math.min(noCount, phrases.length - 1)]}
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
