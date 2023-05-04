import React from 'react';
import { useState } from 'react';
const schoolColor = "#C3C4C0";
const personalColor = "#DB5461";
function Project({project,view,index}) {
    const {name,language,libraries,description,dateStarted,dateCompleted,links,img,forSchool} = project;
    const [hover,setHover] = useState(false);

    const boxStyles = {
        textAlign:"left",
        backgroundColor:forSchool?schoolColor:personalColor,
        display:"grid",
        gridTemplateColumns:"1fr",
        maxWidth:"90%",
        border:"2px solid black",
        margin:"10px 10px 10px 10px",
        borderRadius:"10px",
        // marginLeft:index%2!==0?"auto":"5%",
        // marginRight:index%2!==0?"5%":"auto"

    }
    const pStyles = {
        gridColumn:"1/2",
        marginTop:"2px",
        marginLeft:"7px",
        color:forSchool !== hover?schoolColor:personalColor
    }
    const imgStyles = {
        maxWidth:"80%",
        float:"right",
        display:"inline-block",
        padding:"20px",
        gridColumn:"1/3",
        gridRow:"1/5",
        opacity:hover?0:1
    }
    return (
        <div style={boxStyles} className="project" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>

            <h4 style={{marginLeft:"5px"}}>{name}</h4>
            <p style={{...pStyles,gridRow:"1/2"}}>{`Language: ${language} ${libraries!== 'none' ? 'using '+libraries:''}`}</p>
            <p style={{...pStyles,gridRow:"2/3"}}>{`Description: ${description}`}</p>
            <p style={{...pStyles,gridRow:"3/4"}}>{`Timeline: ${dateStarted} - ${dateCompleted}`}</p>
            {links.length!==0?<a href={links[0]} style={pStyles}>Repository</a>:''}
            {links.length>1?<a href={links[1]} style={pStyles}>Website</a>:''}
            


            <img style={imgStyles} src={img} alt={name} className='projectImage'/>
        </div>
    )

}

export default Project;