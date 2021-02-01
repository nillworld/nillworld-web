import React from "react";

class StateTest extends React.Component{
  state = {
    count: 0
  };
  add = () => {
    count = count + 1;
  };
  minus = () => {
    count = count - 1;
  };
  render() {
    return (
      <div>
        <h1>The number is {this.state.count}</h1>
        <button onClick = {this.add}>Add</button>
        <button onClick = {this.minus}>Minus</button>
      </div>
    )
  }
}
export default StateTest;