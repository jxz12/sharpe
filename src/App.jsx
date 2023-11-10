import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [w, set_w] = useState(0.5);
  const [mx, set_rx] = useState(1); 
  const [my, set_ry] = useState(3); 
  const [sx, set_sx] = useState(1); 
  const [sy, set_sy] = useState(2); 
  const [cxy, set_cxy] = useState(-0.5);

  const variables = [
    { name: `\\(w\\)`,           value: w,   setter: set_w,   default: 0.5  },
    { name: `\\(\\mu_x\\)`,      value: mx,  setter: set_rx,  default: 1    },
    { name: `\\(\\mu_y\\)`,      value: my,  setter: set_ry,  default: 3    },
    { name: `\\(\\sigma_x\\)`,   value: sx,  setter: set_sx,  default: 1    },
    { name: `\\(\\sigma_y\\)`,   value: sy,  setter: set_sy,  default: 2    },
    { name: `\\(\\rho_{x,y}\\)`, value: cxy, setter: set_cxy, default: -0.5 },
  ]
  const sxy = cxy*sx*sy;  // correlation
  const m = w*mx + (1-w)*my;
  const s = Math.sqrt(w*w*sx*sx + (1-w)*(1-w)*sy*sy + 2*w*(1-w)*sxy);

  useEffect(() => {
    if (typeof window?.MathJax !== "undefined"){
      window.MathJax.typesetClear()
      window.MathJax.typeset();
    }
  }, [sxy, m, s]);

  const eq_corr = `$$\\sigma_{x,y} = \\rho_{x,y}\\sigma_x\\sigma_y = ${sxy.toFixed(2)}$$`
  const eq_mean = `$$\\mu = w\\mu_x + (1-w)\\mu_y = ${m.toFixed(2)}$$`;
  const eq_var = `$$\\sigma^2 = w^2\\sigma_x^2 + (1-w)^2\\sigma_y^2 + 2w(1-w)\\sigma_{x,y} = ${s.toFixed(2)}$$`;

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
      <p>{eq_corr}</p>
      <p>{eq_mean}</p>
      <p>{eq_var}</p>
      <svg width='200' height='200'>
        <circle cx={sx*50} cy={200-mx*50} r='5' fill='dodgerblue'/>
        <circle cx={sy*50} cy={200-my*50} r='5' fill='darkorange'/>
        <circle cx={s*50} cy={200-m*50} r='5' fill='white'/>
        <rect width='200' height='200' fill='none' stroke='grey'/>
      </svg>
    </>
  )
}

export default App
