import './index.css'

const Employment = props => {
  const onClickEmploymentType = () => {
    console.log('clicked')
  }
  const {eachItem} = props
  const {label, employmentTypeId} = eachItem

  return (
    <li className="each-type">
      <input
        id={employmentTypeId}
        type="checkbox"
        onClick={onClickEmploymentType}
      />
      <label htmlFor={employmentTypeId} className="each-label">
        {label}
      </label>
    </li>
  )
}

export default Employment
