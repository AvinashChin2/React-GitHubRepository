import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props

  return (
    <li className="repository-cards-container">
      <img
        src={repositoryData.imageUrl}
        className="card-image"
        alt={repositoryData.name}
      />
      <h1 className="card-name">{repositoryData.name}</h1>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          className="stats-image"
          alt="stars"
        />
        <p className="stats-name">{repositoryData.starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          className="stats-image"
          alt="forks"
        />
        <p className="stats-name">{repositoryData.forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          className="stats-image"
          alt="open-issues"
        />
        <p className="stats-name">{repositoryData.issuesCount} open issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem
