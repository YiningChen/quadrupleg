import React from 'react'

function CodePanel (props) {
  return (
    <div className='code-panel'>
      {props.text.map((item, index) => <div key={index}><span className='code-text-caret'>> </span>{`${item}`}</div>)}
    </div>
  )
}

export default CodePanel
