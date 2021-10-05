import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}
const apiUrl = 'https://apis.ccbp.in/popular-repos?language='

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    repositoriesData: [],
    activeLanguageFilter: languageFiltersData[0].id,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeLanguageFilter} = this.state
    this.setState({apiStatus: apiStatusConstants.inprogress})
    const response = await fetch(`${apiUrl}${activeLanguageFilter}`)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.popular_repos.map(eachRepo => ({
        id: eachRepo.id,
        imageUrl: eachRepo.avatar_url,
        name: eachRepo.name,
        starsCount: eachRepo.stars_count,
        forksCount: eachRepo.forks_count,
        issuesCount: eachRepo.issues_count,
      }))
      this.setState({
        repositoriesData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div testid="loader">
      <Loader color="#0284c7" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderRepositoriesList = () => {
    const {repositoriesData} = this.state

    return (
      <ul className="repositories-card-container">
        {repositoriesData.map(eachRepo => (
          <RepositoryItem key={eachRepo.id} repositoryData={eachRepo} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoriesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inprogress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  clickLanguageFilter = newFilterId => {
    this.setState(
      {
        activeLanguageFilter: newFilterId,
      },
      this.getRepositories,
    )
  }

  renderLanguageFilterList = () => {
    const {activeLanguageFilter} = this.state

    return (
      <ul className="filters-list-container">
        {languageFiltersData.map(eachLanguageFilter => (
          <LanguageFilterItem
            key={eachLanguageFilter.id}
            languageFilterDetails={eachLanguageFilter}
            isActive={eachLanguageFilter.id === activeLanguageFilter}
            clickLanguageFilter={this.clickLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div className="popular-repositories-container">
          <h1 className="heading">Popular</h1>
          {this.renderLanguageFilterList()}
          {this.renderApiStatusView()}
        </div>
      </div>
    )
  }
}
export default GithubPopularRepos
