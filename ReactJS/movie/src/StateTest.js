import React from "react";

class StateTest extends React.Component {
  state = {
    count: 0,
    isLoading: true,
  };
  add = () => {
    this.setState((current) => ({ count: current.count + 1 }));
  };
  minus = () => {
    this.setState((current) => ({ count: current.count - 1 }));
    console.log(this.state.count); //refresh되기 전의 state가 찍힘.
    //this.state.count = this.state.count - 1;  >>> Do not mutate state directly.
    //setState()를 쓰면 state를 refresh하고 render를 다시 호출 함.
    //this.setState({count: this.state.count - 1}); 이렇게 안쓰는 이유는
    //  update안된 외부상태에 의존하게 됨 -성능에 몇가지 문제를 야기함 / 그래서 current()을 씀.
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 5000);
    console.log("마운트 완료될때 - render 이후");
  }
  componentDidUpdate() {
    console.log("setState()이후 render 완료 될 때");
  }
  componentWillUnmount() {
    console.log("컴포넌트 연결 끊길때 - 다른페이지 이동");
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? "Loading..." : "<h1>Hi<h1>"}
        <h1>The number is {this.state.count}</h1>
        <button onClick={this.add}>Add</button>
        <button onClick={this.minus}>Minus</button>
      </div>
    );
    //만약 onClick에 this.add()로 코딩하면 클릭할때까 아닌 페이지 로드할때 바로 실행함.
  }
}
export default StateTest;
