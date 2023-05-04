import React from 'react';
const schoolColor = "#C3C4C0";
const personalColor = "#DB5461";
function Project({project,view,index}) {
    const {name,language,libraries,description,dateStarted,dateCompleted,links,img,forSchool} = project;
    const boxStyles = {
        textAlign:"left",
        backgroundColor:forSchool?schoolColor:personalColor,
        display:"grid",
        gridTemplateColumns:"3fr 1fr",
        maxWidth:"80%",
        border:"2px solid black",
        margin:"10px 10px 10px 10px",
        borderRadius:"10px",
        marginLeft:index%2!==0?"auto":"5%",
        marginRight:index%2!==0?"5%":"auto"

    }
    const pStyles = {
        gridColumn:"1/2",
        marginTop:"2px",
        marginLeft:"7px"
    }
    const imgStyles = {
        maxWidth:"300px",
        float:"right",
        display:"inline-block",
        padding:"20px",
        gridColumn:"2/3",
        gridRow:"1/5"
    }
    return (
        <div style={boxStyles} className="project">

            <h4 style={{marginLeft:"5px"}}>{name}</h4>
            <p style={pStyles}>{`Language: ${language} ${libraries!== 'none' ? 'using '+libraries:''}`}</p>
            <p style={pStyles}>{`Description: ${description}`}</p>
            <p style={pStyles}>{`Timeline: ${dateStarted} - ${dateCompleted}`}</p>
            {links.length!==0?<a href={links[0]} style={pStyles}>Repository</a>:''}
            {links.length>1?<a href={links[1]} style={pStyles}>Website</a>:''}
            


            <img style={imgStyles} src={img} alt={name}/>
        </div>
    )

}

export default Project;