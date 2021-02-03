import React from 'react';
import Test from './Test';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Personality(properties){
  return <div>Hello {properties.nill} Nill</div>
}

//PropTypes를 통해 전달받은 Properties가 원하던 Properties인지 확인
Personality.propTypes = {
  nill: PropTypes.number.isRequired 
  //로그에서 보면 error - nill은 "awesome"을 받았고 이건 number가 아니고 String이기 때문
};

function Movies({name}){
  return (
    <div>
      The movie name is {name}
    </div>);
}

function Movies2({name, picture}){
  return (
    <div>
      <ul>
        <li>
          The movie name is {name}
        </li>
          <img src={picture} alt={name} width="300px" />
      </ul>
    </div>);
}


const movieList = [
  {
    id: 1,
    name: "Inception",
    img: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
  },{
    id: 2,
    name: "About Time",
    img: "https://m.media-amazon.com/images/M/MV5BMTA1ODUzMDA3NzFeQTJeQWpwZ15BbWU3MDgxMTYxNTk@._V1_.jpg"
  },{
    id: 3,
    name: "Frozen",
    img: "https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_.jpg"
  }
]

function movieTest(test){
  return <Movies2 key={test.id} name={test.name} picture={test.img}/>
}

function App() {
  return (
    <div className="App">
      <h1>NillWorld</h1>
      <ul>
        <li>
          <Link to='/'>home</Link>
        </li>
        <li>
          <Link to='/test'>test</Link>
        </li>
        <li>
          <Link to='/test'>test</Link>
        </li>
      </ul>
      <Route path="/test" component={Test} />
      <Personality nill="awesome" />
      <Movies name="Inception" />
      <Movies name="About time" />
      <Movies name="Frozen" />
      <div className="usingMap">
        {movieList.map(movie => (
          <Movies2 key={movie.id} name={movie.name} picture={movie.img} />
        ))}
      </div>
      <div>
        {movieList.map(movieTest)}
      </div>
    </div>
  );
}

export default App;
