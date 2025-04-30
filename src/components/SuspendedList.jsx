import { useState } from "react";

export default function SuspendedList({onGuess}) {
  const [selected, setSelected] = useState("Overwhelmingly Positive");
  const [guess, setGuess] = useState(null)

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };

  const handleGuessButtonClick = () => {
    setGuess(selected)
    onGuess(selected)
  };

  return (
    <div className="grid gap-2 w-fit mx-auto justify-items-center">
      <select
        className="bg-inherit border border-white rounded p-2 text-gray-white"
        onChange={handleSelectChange}
      >
        <option value="Overwhelmingly Positive" className="text-black">Overwhelmingly Positive</option>
        <option value="Very Positive" className="text-black">Very Positive</option>
        <option value="Positive" className="text-black">Positive</option>
        <option value="Mostly Positive" className="text-black">Mostly Positive</option>
        <option value="Mixed" className="text-black">Mixed</option>
        <option value="Mostly Negative" className="text-black">Mostly Negative</option>
        <option value="Negative" className="text-black">Negative</option>
        <option value="Very Negative" className="text-black">Very Negative</option>
        <option value="Overwhelmingly Negative" className="text-black">Overwhelmingly Negative</option>
      </select>
      <button
        className="font-semibold text-center border border-white rounded py-2 w-16 mt-3"
        onClick={handleGuessButtonClick}
      >
        Guess
      </button>
    </div>
  );
}