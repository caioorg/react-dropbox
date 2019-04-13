import React, { Component } from 'react';
import api from '../../services/api'

import logo from './assets/logo.svg'
import './Main.css';

export default class Main extends Component {
  state = {
    description: ''
  }

  handleSubmit = async e => {
    e.preventDefault()
    const response = await api.post('/boxes', {
      title: this.state.description
    })
    console.log(response.data)
  }

  handleInputChange = e => {
    this.setState( { description: e.target.value } )
  }

  render() {
    return (
      <div className="main-container">
          <form onSubmit={ this.handleSubmit }>
            <img src={ logo } alt="" />
            <input
              placeholder="Criar um box"
              value={ this.state.description }
              onChange={ this.handleInputChange }
            />
            <button type="submit">Criar</button>
          </form>
      </div>
    )
  }
}
