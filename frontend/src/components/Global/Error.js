import React from "react";

const style = {
    display:"flex",
    justifyContent:"center",
    alignContent:"center",
    flexDirection:"column",
    textAlign:"center"
}
const btnStyle = "btn waves-effect waves-light"
export default function Error() {
    return (
        <div className={"container"} style={style}>
            
            <h2>404 NOT FOUND</h2>
            <h1>Sorry, this page doesn't seem to exist</h1>
            <button onClick={()=> window.location = "/" } className={btnStyle} >Send me back home</button>
        </div>
    )
}