import './App.css';
import React,{useState, useEffect} from 'react';
import Project from './Project';
import projects from './projects.json';
const colors = {Personal: "#B3CDD1",School: "#577399",Both:"rgb(219,213,205)"}
function App() {
  const [view,setView] = useState('Both');
  const [sortBy,setSortBy] = useState('Date');
  const [isShown,setIsShown] = useState(false);
  
  const headerStyles = {
    backgroundColor: colors[view],
    minHeight: "40vh",
    // textAlign: "left",
    // fontSize: "calc(10px + 2vmin)",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "left",
    display:"grid",
    gridTemplateColumns:"1fr 5fr 4fr",
    gridTemplateRows:"1fr 1fr 1fr",
    justifyItems:"left"
  }
  const buttonStyles = {
    margin: "0 auto",
    width:"100px",
    borderRadius:"3px"
  }
  useEffect(() => {

  },[sortBy]);
  function compareFunction(a,b) {
    if(sortBy==='Language'){
      return a.language[0].localeCompare(b.language[0]);
    }
    else{
      return 0;
    }
  }

  return (
    <div className="App">
      <header style={headerStyles}>
        <h1 style={{gridColumn:"2/3",paddingTop:10}}>Ben Davis</h1>
        <h2 style={{fontStyle:'italic',gridColumn:"2/3",gridRow:"2/3"}}>Project Portfolio</h2>
          <img src="images/hero.jpg" alt="hero" style={{
            gridColumn: "3/4",
            gridRow:"1/4",
            width:"100%"}}/>
      <div style={{gridColumn:"1/2"}}>
        <button 
          onClick={event => setView(event.target.innerText)} 
          style={{...buttonStyles,backgroundColor:colors["School"]}}>
          School
        </button>
        <button 
          onClick={event => setView(event.target.innerText)} 
          style={{...buttonStyles,backgroundColor:colors["Personal"]}}>
          Personal
        </button>
        <button 
          onClick={event => setView(event.target.innerText)} 
          style={{...buttonStyles,backgroundColor:colors["Both"]}}>
          Both
        </button>
      </div>
      </header>
      <div onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          style={{margin:"0 auto",display:"inline-block"}}>
        <span style={{display:"block"}}>Sort By... </span>
        <button>
          {sortBy}
        </button>
        {isShown && (
          <div>

            <button style={{display:  "block"}}onClick={event => setSortBy(event.target.innerText)}>Date</button>
            <button onClick={event => setSortBy(event.target.innerText)}>Language</button>
          </div>
        )}
      </div>
      <div className="projects">
        {Array.from(projects).sort(compareFunction).filter(project =>(((view==="School") === project.forSchool)||view==="Both")).map((project,index)=> {
          
          return <Project index={index} key={project.name} view={view} project={project} />
        })}
      </div>
      <footer>
        <a href="https://icons8.com/icon/3sLnwUlMVfmD/app">App</a> icon by <a href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}

export default App;