import React, { Component } from 'react'

class Square extends Component{

  handleClick = () => {
    this.props.handleGamePlay(this.props.index)
  }

  render(){
    return(
      <>
        <div id="square" onClick={this.handleClick}>
          {this.props.value === "?" ? '?' : <img src={this.props.img_url} alt="?" />}
        </div>
      </>
    )
  }
}
export default Square
