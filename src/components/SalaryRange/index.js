import './index.css'

const SalaryRange = props => {
  const {eachItem, onChangePackage} = props
  const {salaryRangeId, label} = eachItem

  const onClickSalarybutton = () => {
    console.log(salaryRangeId)
    onChangePackage(salaryRangeId)
  }
  return (
    <li className="each-type">
      <input
        id={salaryRangeId}
        name="salary"
        type="radio"
        value={salaryRangeId}
        onClick={onClickSalarybutton}
      />
      <label htmlFor={salaryRangeId} className="each-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
