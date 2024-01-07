import React, { Component } from 'react'
import Loading from './Loading.gif'
import './Spinner.css'
export default class Spinner extends Component {
  render() {
    return (
      <div className='spinner_container'>
        <img src={Loading}/>
      </div>
    )
  }
}
