import './index.css'

const SalaryRange = props => {
  const {eachItem} = props
  const {salaryRangeId, label} = eachItem

  const onClickSalarybutton = () => {
    console.log('salry clicked')
  }
  return (
    <li className="each-type">
      <input id={salaryRangeId} type="radio" onClick={onClickSalarybutton} />
      <label htmlFor={salaryRangeId} className="each-label">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
