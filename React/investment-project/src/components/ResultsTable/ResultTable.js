const ResultsTable = (props) => {
  console.log("props", props)
  return (
    <table className="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.data.map((yearData) => {
          console.log("check",+yearData.savingsEndOfYear - +props.initialInvestment - yearData.yearlyContriution * yearData.year)
          return (
          <tr key={yearData.year} >
            <td>{yearData.year}</td>
            <td>{yearData.savingsEndOfYear}</td>
            <td>{yearData.yearlyInterest}</td>
            <td>{yearData.savingsEndOfYear - props.initialInvestment - yearData.yearlyContribution * yearData.year}</td>
            <td>{props.initialInvestment + yearData.yearlyContribution * yearData.year}</td>
          </tr>
        )})}
      </tbody>
    </table>
  );
}
export default ResultsTable;