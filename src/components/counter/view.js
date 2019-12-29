import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { increment, decrement } from './actions'

const stateKey = 'count'

function Counter({ onIncrement, onDecrement, value }) {
  return (
    <div className="counter">
      <button onClick={() => { onIncrement() }} >+</button>
      <button onClick={() => { onDecrement() }} >-</button>
      <span>Count: {value}</span>
    </div>
  )
}

Counter.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number
}

const mapStateToProps = (state) => ({
  value: state[stateKey] || 0
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  onIncrement: increment,
  onDecrement: decrement
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
export { stateKey }
