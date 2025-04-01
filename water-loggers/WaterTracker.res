@react.component
let make = () => {
  let (currentIntake, setCurrentIntake) = React.useState(() => 0)
  let (intakeHistory, setIntakeHistory) = React.useState(() => [])

  let addWater = () => {
    if (currentIntake > 0) {
      setIntakeHistory([...intakeHistory, currentIntake])
      setCurrentIntake(0)
    }
  }

  let totalIntake = List.fold_left((acc, x) => acc + x, 0, intakeHistory)

  <React.Fragment>
    <h1>Water Tracker</h1>
    <input
      type="number"
      value={currentIntake}
      onChange={event => {
        let value = event->ReactEvent.Form.target->ReactEvent.Form.value->int_of_string
        if (value >= 0) {
          setCurrentIntake(value)
        }
      }}
      placeholder="Enter amount in ml"
      style={"width: 200px; margin-right: 10px;"}
    />
    <button onClick={addWater}>Add Water</button>
    <h2>Total Intake: {totalIntake} ml</h2>
    <h3>Intake History:</h3>
    <ul>
      {List.map(intake => <li>{intake} ml</li>, intakeHistory)}
    </ul>
  </React.Fragment>
}
