import './App.css';
import React,{useState, useEffect} from 'react';
import Project from './Project';
import { firebase } from './firebase';
import {getDownloadURL, getStorage, ref} from "firebase/storage";
const colors = {Personal: "#B3CDD1",School: "#577399",Both:"rgb(219,213,205)"}
const projectsRef = firebase.firestore().collection("Projects");
const storage = getStorage();
const picturesRefs = [ref(storage,'menu.png'),ref(storage,'hero.jpg')];

function App() {
  const [view,setView] = useState('Both');
  const [sortBy,setSortBy] = useState('Date');
  const [sideBarVisible,setSideBarVisible] = useState(false);
  const [projects,setProjects] = useState([]);
  const [urls,setUrls] = useState([]);


  useEffect(() => {
    projectsRef
    .onSnapshot(
      querySnapshot => {
        const projectsD = [];
        querySnapshot.forEach((doc) => {
          const project = doc.data();
          projectsD.push({
            id: doc.id,
            ...project,
          })
        })
        setProjects(projectsD)
      }
    )
    const urls = []
    picturesRefs.forEach((pictureRef) => {
      getDownloadURL(pictureRef).then((downloadUrl) => {
        urls.push(downloadUrl)
      })
    })
    setUrls(urls);
  },[]);
  const headerStyles = {
    backgroundColor: colors['Both'],
    // minHeight: "20vh",
    // textAlign: "left",
    // fontSize: "calc(10px + 2vmin)",
    // display: "flex",
    // flexDirection: "row",
    // justifyContent: "left",
    display:"grid",
    gridTemplateColumns:"1fr 1fr 2fr 4fr",
    gridTemplateRows:"1fr 1fr 1fr",
    justifyItems:"center",
    alignItems:"center"
  }
  const buttonStyles = {
    width:"100%",
    border:0,
    boxShadow:"1px 1px rgb(200,200,200)"
  }
  const menuButtonStyles = {
    padding:0,
    maxHeight:50,
    gridRow:"1/2",
    backgroundColor:"transparent",
    border:0,
  }
  function compareFunction(a,b) {
    if(sortBy==='Language'){
      return a.language[0].localeCompare(b.language[0]);
    }
    else if (sortBy==='Date'){
      return  b.dateStarted.seconds-a.dateStarted.seconds;
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
          <img src={urls[1]} alt="main" style={{
            gridColumn: "4/5",
            gridRow:"1/4",
            width:"100%"}}/>

      <div className='sideBar' style={{gridColumn:"1/2",gridRow:"1/4",backgroundColor:sideBarVisible?"white":"transparent",height:"100%",display:"grid",gridTemplateRows:"1fr 1fr 1fr",alignItems:"center",justifyItems:"center"}}>
        <button style={menuButtonStyles} onClick={() => setSideBarVisible(!sideBarVisible)}><img src={urls[0]} alt="menu button" style={{maxWidth:40}}></img></button>
        <div className="sideBarContent" style={{visibility:sideBarVisible?"visible":"hidden"}}>
          <span style={{display:"block"}}>Filter By... </span>
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
          <div>
            <span style={{display:"block"}}>Sort By... </span>
              <div>

                <button style={buttonStyles} onClick={event => setSortBy(event.target.innerText)}>Date</button>
                <button style={buttonStyles} onClick={event => setSortBy(event.target.innerText)}>Language</button>
              </div>
          </div>
        </div>
      </div>
      </header>
      <div className="projects">
        {projects.sort(compareFunction).filter(project =>(((view==="School") === project.forSchool)||view==="Both")).map((project,index)=> {
          return project? <Project storage={storage} index={index} key={project.name} view={view} project={project} />:<p>loading</p>
        })}
      </div>
      <footer style={{backgroundColor:colors.Personal}}>
        <a href="https://icons8.com/icon/3sLnwUlMVfmD/app">App</a>  and Menu icon by <a href="https://icons8.com">Icons8</a>
      </footer>
    </div>
  );
}

export default App;