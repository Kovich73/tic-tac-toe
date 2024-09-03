import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import {
  getDiagonalCombinations,
  getHorizontalCombinations,
  getInitialValues,
  getVerticalCombinations,
  charO,
  charX
} from './helpers';

const winnerX = charX.repeat(3);
const winnerO = charO.repeat(3);

const App = () => {
  const [size, setSize] = useState(3);
  const [values, setValues] = useState(getInitialValues(size));
  const [char, setChar] = useState(charX);
  const [winner, setWinner] = useState('');
  const [combinations, setCombinations] = useState(
    [
      ...getVerticalCombinations(size),
      ...getHorizontalCombinations(size),
      ...getDiagonalCombinations(size)
    ]
  );

  const keys = Object.keys(values);

  useEffect(() => {
    let winChar = null;

    combinations.forEach((item) => {
      const str = item.split(' ').map((key) => values[key] || 'hui').join('');

      if (str.includes(winnerX)) winChar = charX;
      if (str.includes(winnerO)) winChar = charO;
    });

    if (winChar) {
      setWinner(winChar);
      return;
    }

    const isDraw = !keys.some((key) => !Boolean(values[key]));
    if (isDraw) {
      setWinner('tie');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleCheck = (i: number) => () => {
    if (winner || values[i]) return;

    setValues({
      ...values,
      [i]: char
    })
    setChar(char === charX ? charO : charX);
  }

  const handleChangeSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = +e.target.value;
    setSize(newSize)
    setCombinations([
      ...getVerticalCombinations(newSize),
      ...getHorizontalCombinations(newSize),
      ...getDiagonalCombinations(newSize)
    ]);
    setValues(getInitialValues(newSize));
    setChar(charX);
    setWinner('');
  }

  const handleRefresh = () => {
    setValues(getInitialValues(size));
    setChar(charX);
    setWinner('');
  }

  const getCells = () => keys.map((key, i) => (
    <td
      key={`td-${i}`}
      onClick={handleCheck(i + 1)}
    >
      {values[key]}
    </td>
  ));

  const getGrid = () => {
    const result = [];
    const cells = getCells();

    for (let i = 0; i < size; i++) {
      result.push(
        <tr key={`tr-${i}`}>
          {cells.splice(0, size)}
        </tr>
      )
    }

    return result;
  }

  const getWinner = () => {
    if (!winner) {
      return (
        <>
          Let's go. <br />
          Player - <span>'{char}'</span> turn
        </>
      );
    }

    if (winner === 'tie') {
      return (
        <>
          Tie! <br />
          Start again!
        </>
      )
    }

    return (
      <>
        Congratulations - <span>'{winner}'</span>.<br />
        You win
      </>
    )
  }

  return (
    <div className='page'>
      <h1>Tic tac toe</h1>
      <div className="input-group">
        <div className='input'>
          <span>Field's size</span>
          <select onChange={handleChangeSize}>
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
          </select>
        </div>
      </div>
      <table>
        <tbody>
          {getGrid()}
        </tbody>
      </table>
      <h2>{getWinner()}</h2>
      <button style={{ opacity: winner ? 1 : 0 }} onClick={handleRefresh}>Refresh</button>
    </div>
  );
}

export default App;