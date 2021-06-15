import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import {connect} from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    const filter = event.target.value
    props.setFilter(filter)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  }
}

const mapDispatchToProps = { setFilter }

export default connect(mapStateToProps, mapDispatchToProps)(Filter)