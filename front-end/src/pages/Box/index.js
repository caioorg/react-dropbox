import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md'
import { distanceInWords } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '../../services/api'

import logo from './assets/logo.svg'
import './Box.css'

export default class Box extends Component {
  state = {
    list: []
  }

  async componentDidMount() {
    const id = this.props.match.params.id
    const response = await api.get(`boxes/${id}`)
    this.setState({ list: response.data })
  }

  render() {
    return (
      <div className="box-container">
        <header>
          <img src={ logo } alt="" />
          <h1>{ this.state.list.title }</h1>
        </header>
        <section>
          <ul>
            {
              this.state.list.files && this.state.list.files.map((item, index) => (
                <li key={ index }>
                  <a href={ item.url } target="_blank" rel="noopener noreferrer" >
                    <MdInsertDriveFile size={ 24 } color="#A5CFFF" />
                    <strong>{ item.title }</strong>
                  </a>
                  <span>
                    há {
                      distanceInWords(item.createdAt, new Date(), {
                        locale: pt
                      })
                    }
                  </span>
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    )
  }
}
