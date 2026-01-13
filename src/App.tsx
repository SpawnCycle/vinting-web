import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>Hello, World!</div>
      <div>{count}</div>
      <button
        className="bg-red-500 text-blue-200"
        onClick={() => setCount(count + 1)}
      >
        Click me!
      </button>
    </div>
  );
}

export default App;
