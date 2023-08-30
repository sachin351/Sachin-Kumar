import Header from "./components/Header/Header";
import UserInput from "./components/UserInput/UserInput";
import ResultsTable from "./components/ResultsTable/ResultTable";
import { useState } from "react";

function App() {
  const [userInput, setUserInput] = useState(null);

  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };
  const yearlyData = [];

  if (userInput) {
    console.log("userInput", userInput)
    let currentSavings = userInput['current-savings'];
    const yearlyContribution = userInput['yearly-contribution'];
    const expectedReturn = userInput['expected-return'] / 100;
    const duration = userInput['duration'];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + +yearlyContribution;
      const data  = {
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      }
      console.log("Data", data)
      yearlyData.push(data);
    }
  }
  console.log('sjhs',yearlyData);

  return (
    <div>
      <Header></Header>
      <UserInput onCalculate={calculateHandler}></UserInput>
      {!userInput && <p>No investment calculated yet.</p>}
      {userInput && <ResultsTable data={yearlyData} initialInvestment={userInput['current-savings']}></ResultsTable>}
    </div>
  );
}

export default App;
