import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const week = 52;
  const [date, setDate] = useState("");
  const [years, setyears] = useState(60);
  const [total, setTotal] = useState<number | null>(null);
  const [weeksDone, setWeeksDone] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("HML-age")) {
      const dob = new Date(localStorage.getItem("HML-age") || "");
      const today = new Date();
      const weeksLived = Math.floor(
        (today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 7)
      );
      setWeeksDone(weeksLived);
      setTotal(weeksDone * years);
      setDate(localStorage.getItem("HML-age") || Date.now().toString());
    }
  }, []);

  useEffect(() => {
    if (years) {
      setTotal(week * years);
    }
  }, [years, weeksDone, week]);

  useEffect(() => {
    const dob = new Date(date);
    const today = new Date();
    const weeksLived = Math.floor(
      (today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 7)
    );
    setWeeksDone(weeksLived);
  }, [date]);

  function handleDOB(dob: string) {
    setDate(dob);
    localStorage.setItem("HML-age", dob);
  }

  console.log("weeksDone", weeksDone);
  console.log("weeksDone", weeksDone);

  return (
    <>
      <h2 className="main-heading">HOW MUCH TIME LEFT</h2>
      <main>
        <section className="choose-date">
          <h4>Select your birth date</h4>
          <input
            type="date"
            value={date}
            onChange={(e) => handleDOB(e.target.value)}
          />
          <h4>Add your expected living life</h4>
          <input
            type="number"
            max={90}
            min={1}
            value={years}
            onChange={(e) => setyears(Number(e.target.value))}
          />
        </section>
        <section className="Visualizer">
          {total && (
            <div className="container">
              {Array.from({ length: total }, (_, i) => (
                <div
                  key={i}
                  className={`${i + 1 > weeksDone ? "box" : "box-filled"} ${
                    i != 0 && i % 519 == 0 && "year-row-gap"
                  }`}
                ></div>
              ))}
            </div>
          )}
        </section>
        <section className="date-list">
          <h1 className="date-list-heading">
            <i>{total && ((weeksDone / total) * 100).toFixed(2)}% Life Completed</i>
          </h1>
          <h1>
            <i>
              {Math.floor((weeksDone * 7) / 30)} Months {(weeksDone * 7) % 30}{" "}
              Days {" "}
            </i>
          </h1>
          <h1>
            <i>{weeksDone} Weeks</i>
          </h1>
          <h1>
            <i>{weeksDone * 7} Days</i>
          </h1>
          <h1>
            <i>{weeksDone * 7 * 24} Hours</i>
          </h1>
          <h1>
            <i>{weeksDone * 7 * 24 * 60} Minutes</i>
          </h1>
          <h1>
            <i>{weeksDone * 7 * 24 * 60 * 60} Seconds</i>
          </h1>
        </section>
      </main>
    </>
  );
}

export default App;
