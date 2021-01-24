
function Personality(properties){
  return <div>Hello {properties.wish} Nill</div>
}
function Movies({name}){
  return (
    <div>
      The movie name is {name}
    </div>);
}
function Movies2({name, picture}){
  return (
    <div>
      The movie name is {name}
      <img src={picture} alt={name} />
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

function App() {
  return (
    <div className="App">
      <h1>NillWorld</h1>
      <Personality wish="awesome" />
      <Movies name="Inception" />
      <Movies name="About time" />
      <Movies name="Frozen" />
      <div className="usingMap">
        {movieList.map(movie => (
          <Movies2 key={movie.id} name={movie.name} picture={movie.img} />
        ))}
      </div>
    </div>
  );
}

export default App;
