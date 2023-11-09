import { useEffect } from 'react'
import './App.css'

function App() {
  const data = `When \\(a \\ne 0\\), there are two solutions to \\(ax^2 + bx + c = 0\\) and they are
$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$`;
  useEffect(() => {
    if (typeof window?.MathJax !== "undefined"){
      // window.MathJax.typesetClear()
      window.MathJax.typeset();
    }
  }, []);

  return (
    <>
      <p>{data}</p>
    </>
  )
}

export default App
