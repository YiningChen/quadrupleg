import _ from 'lodash'
import React, { Component } from 'react'
import DraggableMethodsContainer from './draggable-methods'

import Grid from './grid'
import CodePanel from './code-panel'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
      /*
    const url = 'https://cdn.dribbble.com/users/375867/screenshots/2001532/crocodile-dragon-frog-running-and-jumping-game-character-sprite-sheets-game-asset-game-art-game-design-cartoon.jpg'
      return {
            background: null,
            actions: [],
            image: (rowIndex === 2 && colIndex === 2) && url
          }
      */
    const grid = _.range(props.rows).map((rowIndex) => (
      _.range(props.columns).map((colIndex) => 0)
    ))

    this.state = {
      grid: grid,
      text: []
    }
  }

  updateText (text) {
    this.setState((prevState) => ({
      text: prevState.text.concat(text)
    }))
  }

  updateGrid (row, column, data) {
    this.setState((state) => {
      state.grid[row][column] = data
    })
  }

  loopThroughGrid (method) {
    this.state.grid.map((row, rowIndex) => (
      row.map((item, colIndex) => {
        method(item, rowIndex, colIndex)
      })
    ))
  }

  render () {
    const { percentWidthGrid, columns, rows } = this.props
    const percentWidthTile = percentWidthGrid / columns
    const percentHeightGrid = percentWidthTile * rows

    return (
      <div className='App'>
        <div style={{ height: `${percentHeightGrid}vw` }}>
          <div className='panel' style={{width: `${100 - percentWidthGrid}vw`}}>
            <CodePanel text={this.state.text} />
          </div>
          <div className='panel' style={{width: `${percentWidthGrid}vw`}}>
            <Grid
              grid={this.state.grid}
              dimension={percentWidthTile}
              updateGrid={this.updateGrid.bind(this)}
              updateText={this.updateText.bind(this)}
            />
          </div>
        </div>
        <div style={{ background: 'black', height: `calc(100vh - ${percentHeightGrid}vw)` }}>
          <DraggableMethodsContainer />
        </div>
      </div>
    )
  }
}

export default App
