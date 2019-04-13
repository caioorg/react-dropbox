import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md'
import DropZone from 'react-dropzone'
import socket from 'socket.io-client'

import { distanceInWords } from 'date-fns'
import pt from 'date-fns/locale/pt'

import api from '../../services/api'

import logo from './assets/logo.png'
import './Box.css'

export default class Box extends Component {
  state = {
    list: []
  }

  async componentDidMount() {
    this.subscribeToNewFiles()

    const id = this.props.match.params.id
    const response = await api.get(`boxes/${id}`)
    this.setState({ list: response.data })
  }

  handleUpload = files => {
    files.forEach(item => {
      const data = new FormData()
      const id = this.props.match.params.id

      data.append('file', item)

      api.post(`boxes/${id}/upload-files`, data)
    })
  }

  subscribeToNewFiles = () => {
    const id = this.props.match.params.id
    const io = socket('http://localhost:3333')

    io.emit('connectRoom', id)

    io.on('file', data => {
      this.setState({ list: { ...this.state.list, files: [ data, ...this.state.list.files, ] }})
    })
  }

  render() {
    return (
      <div className="box-container">
        <header>
          <a className="back-page" href="/">
            Voltar
          </a>
          <img src={ logo } alt="" />
          <h1>{ this.state.list.title }</h1>
        </header>
        <section>

          <DropZone onDropAccepted={ this.handleUpload }>
            {
              ({ getInputProps, getRootProps }) => (
                <div className="upload" { ...getRootProps() }>
                  <input { ... getInputProps() } />
                  <p>Arraste alguma arquivo ou clique aqui</p>
                </div>
              )
            }
          </DropZone>

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
