import React from 'react';
import { useState,useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
const schoolColor = "#C3C4C0";
const personalColor = "#DB5461";
function Project({project,view,index,storage}) {
    const {name,language,libraries,description,dateStarted,dateCompleted,links,img,forSchool} = project;
    const [url,setUrl] = useState('');
    const [hover,setHover] = useState(false);

    useEffect(() => {
        getDownloadURL(ref(storage,img)).then((downloadUrl) => {
            setUrl(downloadUrl);
        })

    },[img,storage])

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
    const getDate = (timeStamp) => {
        let d = new Date(timeStamp.seconds * 1000)
        return `${d.toLocaleString('default',{month:'short'})} ${d.getFullYear()}`
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
            <p style={{...pStyles,gridRow:"3/4"}}>{`Timeline: ${getDate(dateStarted)} - ${getDate(dateCompleted)}`}</p>
            {links.length!==0?<a href={links[0]} style={pStyles}>Repository</a>:''}
            {links.length>1?<a href={links[1]} style={pStyles}>Website</a>:''}
            


            <img style={imgStyles} src={url} alt={name} className='projectImage'/>
        </div>
    )

}

export default Project;