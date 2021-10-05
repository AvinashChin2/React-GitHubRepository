import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageFilterDetails, clickLanguageFilter} = props
  const buttonClassName = isActive
    ? 'language-btn active-language-btn'
    : 'language-btn'

  const onClickLanguageFilter = () => {
    clickLanguageFilter(languageFilterDetails.id)
  }
  return (
    <li>
      <button
        className={buttonClassName}
        type="button"
        onClick={onClickLanguageFilter}
      >
        {languageFilterDetails.language}
      </button>
    </li>
  )
}
export default LanguageFilterItem
