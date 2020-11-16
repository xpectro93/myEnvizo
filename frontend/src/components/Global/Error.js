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
            <h1>Halt! Who goes there? You shouldn't be here</h1>
            <h3>Make like a tree and leaf...</h3>
            <button onClick={()=> window.location = "/" } className={btnStyle} >Send me back home</button>
        </div>
    )
}