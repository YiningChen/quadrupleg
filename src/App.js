import _ from 'lodash'
import React, { Component } from 'react'

import Grid from './grid'
import Icon from './icon'
import CodePanel from './code-panel'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

      const grid = _.range(props.rows).map((rowIndex) => (
      _.range(props.columns).map((colIndex) => 0)
    ))

    this.items = [{
      name: 'patrick',
      still: './patrick-still.png',
      gif: './patrick.gif'
    }, {
      name: 'poop',
      still: './poop.png',
      gif: './poop.png'
    }, {
      name: 'channing',
      still: './channinghead.png',
      gif: './channinghead.png'
    }, {
      name: 'ghost',
      still: './ghost.png',
      gif: './ghost.png'
    }, {
      name: 'alien',
      still: './alien.png',
      gif: './alien.png'
    }]

    this.state = {
      isDragging: false,
      grid: grid,
      text: []
    }
  }

  updateText (text) {
    if (window.createjs) {
      window.createjs.Sound.play('pop');
    }

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

  onStartDrag () {
    this.setState({ isDragging: true })
  }

  onStopDrag () {
    this.setState({ isDragging: false })
  }

  registerSound () {
    if (this.soundNotLoaded) {
      return
    }

    window.createjs.Sound.registerSound({ src:'./pop.wav', id: 'pop' })
    this.soundNotLoaded = true
  }

  render () {
    const { percentWidthGrid, columns, rows } = this.props
    const percentWidthTile = percentWidthGrid / columns
    const percentHeightGrid = percentWidthTile * rows
    const dimension = `${percentWidthTile}vw`
    window.createjs && this.registerSound()

    return (
      <div className={'App' + (this.state.isDragging ? ' is-dragging' : '')}>
        <div style={{ height: `${percentHeightGrid}vw` }}>
          <div className='panel' style={{width: `${100 - percentWidthGrid}vw`, height: '100%', background: '#f9f9f9'}}>
            <CodePanel text={this.state.text} />
          </div>
          <div className='panel' style={{width: `${percentWidthGrid}vw`}}>
            <Grid
              grid={this.state.grid}
              dimension={dimension}
              updateGrid={this.updateGrid.bind(this)}
              updateText={this.updateText.bind(this)}
            />
          </div>
        </div>
        <div className='bottom-panel' style={{ height: `calc(100vh - ${percentHeightGrid}vw)` }}>
          {this.items.map((item, index) => (
            <Icon key={index}
              dimension={dimension}
              {...item}
              onStart={this.onStartDrag.bind(this)}
              onStop={this.onStopDrag.bind(this)}
              updateText={this.updateText.bind(this)}/>
          ))}
        </div>
      </div>
    )
  }
}

export default App
