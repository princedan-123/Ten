import { useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const { width, height } = useWindowSize();
  function checkWin() {
    let value;
    for (let die of dice) {
      if (die.isHeld === false) {
        return false;
      }
      if (value === undefined) {
        value = die.value;
      } else if (value != die.value) {
        return false;
      }
    }
    return true;
  }
  let gameWon = checkWin();
  function generateAllNewDice() {
    const randomArray = [];
    for (let key = 1; key <= 10; key++) {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      const die = {
        id: nanoid(),
        isHeld: false,
        value: randomNumber,
      };
      randomArray.push(die);
    }
    return randomArray;
  }
  function hold(id) {
    setDice((prev) =>
      prev.map((die) => {
        const newDie = { ...die };
        if (newDie.id === id) {
          newDie.isHeld = !newDie.isHeld;
        }
        return newDie;
      })
    );
  }

  const diceElement = dice.map((die) => {
    return (
      <div key={die.id}>
        <Die
          dieObject={die}
          holdDie={() => {
            hold(die.id);
          }}
        />
      </div>
    );
  });

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice());
    }
    setDice((prev) => {
      return prev.map((die) =>
        die.isHeld
          ? { ...die }
          : { ...die, value: Math.ceil(Math.random() * 6) }
      );
    });
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <section className="die-section">
        <div className="sr-only">
          {gameWon && (
            <p>
              Congratulations!! you won kindly press the new game button for a
              new game
            </p>
          )}
        </div>
        {gameWon && <Confetti width={width} height={height} />}
        <div className="dice-grid">{diceElement}</div>
        <section>
          <button className="roll-button" onClick={rollDice}>
            {gameWon ? "New Game" : "Roll"}
          </button>
        </section>
      </section>
    </main>
  );
}
