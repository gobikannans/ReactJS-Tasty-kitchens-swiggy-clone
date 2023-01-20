import {Component} from 'react'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'

import './index.css'

const totalPages = 4
const Page = 1

class Counter extends Component {
  state = {currentPage: Page}

  onIncrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage < totalPages) {
      this.setState(
        pre => ({currentPage: pre.currentPage + 1}),
        pageChangeFunction(currentPage + 1),
      )
    }
  }

  onDecrement = () => {
    const {pageChangeFunction} = this.props
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        pre => ({currentPage: pre.currentPage - 1}),
        pageChangeFunction(currentPage - 1),
      )
    }
  }

  render() {
    const {currentPage} = this.state
    return (
      <div className="page-container">
        <button type="button" className="page-btn" onClick={this.onDecrement}>
          <AiOutlineLeft className="arrow-icon" />
        </button>
        <div>
          <p className="page-text">
            <span>{currentPage}</span> of {totalPages}
          </p>
        </div>
        <button type="button" className="page-btn" onClick={this.onIncrement}>
          <AiOutlineRight className="arrow-icon" />
        </button>
      </div>
    )
  }
}

export default Counter
