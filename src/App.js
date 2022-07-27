import React, { useState } from "react";
import logo from "./github.svg";

export default function App() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [salary, setSalary] = useState("");
  const [result, setResult] = useState(0);

  function calc(event) {
    event.preventDefault();

    const offsetLow = goal - goal * 0.02;
    const offsetHigh = goal + goal * 0.02;

    let max = 100,
      min = 0,
      mid,
      bank;

    if (salary * deadline > goal) {
      top: for (let step = 0; step < 10000; step++) {
        mid = (min + max) / 2;
        bank = 0;

        for (let i = 0; i < deadline; i++) {
          bank = bank + salary * (mid / 100);
        }

        if (bank >= offsetLow && bank <= offsetHigh) {
          setResult(mid);
          break top;
        } else if (bank < offsetLow) {
          min = mid;
        } else if (bank > offsetHigh) {
          max = mid;
        }
      }
    }

    setGoal("");
    setDeadline("");
    setSalary("");
  }

  return (
    <React.Fragment>
      <main className="main">
        <article>
          <h1>Savings calculator</h1>
          <p>
            Calculate how much money you need to contribute each month in order
            to arrive at specific savings goal.
          </p>

          <form className="form" onSubmit={calc}>
            <div>
              <label htmlFor="goal">Savings goal</label>
              <input
                id="goal"
                inputMode="numeric"
                name="goal"
                onChange={(event) => setGoal(+event.target.value)}
                pattern="\d{6,9}"
                required
                type="text"
                value={goal}
              />
            </div>

            <div>
              <label htmlFor="deadline">Deadline in months</label>
              <input
                id="deadline"
                inputMode="numeric"
                name="deadline"
                onChange={(event) => setDeadline(+event.target.value)}
                pattern="\d{1,3}"
                required
                type="text"
                value={deadline}
              />
            </div>

            <div>
              <label htmlFor="salary">Monthly salary</label>
              <input
                id="salary"
                inputMode="numeric"
                name="salary"
                onChange={(event) => setSalary(+event.target.value)}
                pattern="\d{6,9}"
                required
                type="text"
                value={salary}
              />
            </div>

            <button type="submit">Calculate</button>
          </form>

          <p className="result">{result !== 0 && result.toFixed(1)}</p>
        </article>
      </main>

      <footer aria-hidden="true" className="footer">
        <a href="https://github.com/VaselineCoveredCat/untitled-project-3">
          <img alt="" focusable="false" src={logo} />
        </a>
      </footer>
    </React.Fragment>
  );
}
