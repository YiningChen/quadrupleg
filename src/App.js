import _ from 'lodash'
import React, { Component } from 'react';

import './App.css';

import Grid from './grid'

const pos = { rowIndex: 0, colIndex: 0 }

class App extends Component {
  constructor (props) {
    super(props)
    const url = 'https://cdn.dribbble.com/users/375867/screenshots/2001532/crocodile-dragon-frog-running-and-jumping-game-character-sprite-sheets-game-asset-game-art-game-design-cartoon.jpg'

    

    window.setInterval


    this.state = {
      grid: _.range(props.rows).map((rowIndex) => (
        _.range(props.columns).map((colIndex) => {
          return {
            background: null,
            actions: [],
            image: (rowIndex === 2 && colIndex === 2) && url
          }
        })
      ))
    }

  }

  render () {
    const settings = {
      dimension: 50
    }

    return (
      <div className="App">
        <div style={{ height: `${settings.dimension * this.props.rows}px` }}>
          <div className='panel' style={{ width: `calc(100% - ${settings.dimension * this.props.columns}px)`}}>
            Action Panel
          </div>
          <div className='panel'>
            <Grid grid={this.state.grid} {...settings}/>
          </div>
        </div>
        <div style={{ background: 'red', height: `calc(100vh - ${settings.dimension * this.props.rows}px)` }}>
          Bottom Panel
        </div>
      </div>
    );
  }
}

export default App;
