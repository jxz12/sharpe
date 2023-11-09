import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [w, set_w] = useState(0.5);
  const [rx, set_rx] = useState(1); 
  const [ry, set_ry] = useState(1); 
  const [sx, set_sx] = useState(1); 
  const [sy, set_sy] = useState(1); 
  const [sxy, set_sxy] = useState(0.5);

  const variables = [
    { name: `\\(w\\)`,       value: w,   setter: set_w,   default: 0.5 },
    { name: `\\(r_x\\)`,     value: rx,  setter: set_rx,  default: 1   },
    { name: `\\(r_y\\)`,     value: ry,  setter: set_ry,  default: 1   },
    { name: `\\(s_x\\)`,     value: sx,  setter: set_sx,  default: 1   },
    { name: `\\(s_y\\)`,     value: sy,  setter: set_sy,  default: 1   },
    { name: `\\(s_{x,y}\\)`, value: sxy, setter: set_sxy, default: 0.5 },
  ]
  const r = w*rx + (1-w)*ry;
  const s = w*w*sx*sx + (1-w)*(1-w)*sy*sy + 2*w*(1-w)*sxy;

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined"){
      window.MathJax.typesetClear()
      window.MathJax.typeset();
    }
  }, [r, s]);

  const eq_mean = `$$r = wr_x + (1-w)r_y = ${r.toFixed(2)}$$`;
  const eq_var = `$$s^2 = w^2s_x^2 + (1-w)^2s_y^2 + 2w(1-w)s_{x,y} = ${s.toFixed(2)}$$`;

  return (
    <>
      {
        variables.map(v => (
          <div key={v.name}>{v.name} <input
              type='number'
              value={v.value}
              step='0.1'
              onChange={(e) => v.setter(e.target.value ?? v.default)}
          /></div>
        ))
      }
      <p>{eq_mean}</p>
      <p>{eq_var}</p>
      <svg width='200' height='200'>
        <circle cx={s*200} cy={r*100} r='5'/>
      </svg>
    </>
  )
}

export default App
