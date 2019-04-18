import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import logo from "./assets/logo.png";
import "./Main.css";

export default class Main extends Component {
  state = {
    description: "",
    listAll: []
  };

  componentDidMount() {
    this.handleListBox();
  }

  handleListBox = async () => {
    const response = await api.get("/boxes");
    if (response.status === 200) {
      this.setState({ listAll: response.data });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await api.post("/boxes", {
      title: this.state.description
    });

    this.props.history.push(`/box/${response.data._id}`);
  };

  handleInputChange = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    return (
      <div className="main-container">
        <form onSubmit={this.handleSubmit}>
          <img src={logo} alt="" />
          <input
            placeholder="Criar um box"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <button type="submit">Criar</button>
          <p>Últimos boxes criados:</p>
          <ul className="list-box">
            {this.state.listAll &&
              this.state.listAll.map(item => (
                <Link key={item._id} to={`/box/${item._id}`}>
                  <li key={item._id} className="list-content">
                    {item.title}
                  </li>
                </Link>
              ))}
          </ul>
        </form>
      </div>
    );
  }
}
