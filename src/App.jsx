import { useCallback, useEffect, useState, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const inputref = useRef(null);

  const generatePassword = useCallback(() => {
    let result = '';
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) {
      characters += '0123456789';
    }
    if (charAllowed) {
      characters += '!@#$%^&*()_+=-[]{}|;:,.<>/?';
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * characters.length + 1);
      result += characters.charAt(char);
    }
    setPassword(result);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClibBoard = useCallback(() => {
    inputref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 via-pink-500 to-orange-500">
      <div className="w-full max-w-lg bg-gray-800 shadow-xl rounded-lg p-8 space-y-8">
        <h1 className="text-3xl font-bold text-white text-center">Password Generator</h1>

        <div className="flex items-center shadow-md rounded-lg overflow-hidden bg-white">
          <input
            type="text"
            value={password}
            placeholder="Generated password"
            readOnly
            ref={inputref}
            className="w-full px-4 py-3 text-gray-900 bg-gray-200 border-none outline-none"
          />
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3"
            onClick={copyToClibBoard}
          >
            Copy
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-white">
            <label className="font-medium">Password Length</label>
            <span>{length}</span>
          </div>
          <input
            type="range"
            min={6}
            max={30}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full cursor-pointer accent-teal-500 transition-all ease-in-out duration-300"
          />
        </div>

        <div className="flex justify-between items-center space-x-4">
          <div className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="w-4 h-4 cursor-pointer accent-teal-600 transition-all duration-300"
            />
            <label htmlFor="numberInput" className="font-medium">Include Numbers</label>
          </div>
          <div className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="w-4 h-4 cursor-pointer accent-teal-600 transition-all duration-300"
            />
            <label htmlFor="charInput" className="font-medium">Include Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;