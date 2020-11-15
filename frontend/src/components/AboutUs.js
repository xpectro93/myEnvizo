import React,  { Component } from 'react';
import '../css/aboutus.css'

const theTeam = [
  {
    name:"Leo Lu",
    github:"https://github.com/Godsby",
    picture: "https://avatars3.githubusercontent.com/u/43789625?s=460&v=4",
    about:"Full Stack Engineer. Like our user Theresa (dudette), he cares about the next generation.",
    linkedIn:'https://www.linkedin.com/in/followingdreams/'
  },
  {
      name:"Michell Tejada",
      github:"https://github.com/mitejada",
      picture:"https://avatars3.githubusercontent.com/u/43785032?s=460&v=4",
      about:"Full Stack Engineer. Ask her anything about React and sports",
      linkedIn:"https://www.linkedin.com/in/michell-tejada-8a78b5174/"
    }
  ,
  {
      name:"Rinat Tregerman",
      github:"https://github.com/RinatTr",
      picture:"https://avatars3.githubusercontent.com/u/43793455?s=460&u=132ff4d54d2e18886d2775b4142cd3f8af8482dc&v=4",
      about:"Full Stack Engineer. Her code is music to our ears.",
      linkedIn:"https://www.linkedin.com/in/rinat-tregerman/"
   
  },
  {
      name:"Jonathan Andrade",
      github:"https://github.com/RinatTr",
      picture:"https://avatars1.githubusercontent.com/u/43793627?s=460&u=6c90232d2632969d78cda786866ad06938a5847f&v=4",
      about:"Full Stack Engineer. Programmer at day, gamer at night.",
      linkedIn:"https://www.linkedin.com/in/xpectro93/"
    
  }


]
export default class  AboutUs extends Component {
  constructor(){
    super()
    this.topDiv =React.createRef()
  }
  clickTop = e => {
    if (this.topDiv.current) {
      this.topDiv.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  }

  render(){
    return (
      <div className='container about'>

      <h2  ref={this.topDiv} >Our Mission</h2>
      <p className='flow-text'>We care about the environment, and we wanted to create an app to encourage users to change their habits by increasing visibility.
        We believe that if users see their impact, they will be empowered to act and engage with their communities.</p>
      
      <h2 >Meet The Envizo Team</h2>

      <div className="us">
      {
        theTeam.map(member => {
          return(
            <div className='me s6 m6 l6'>
              <img className="ipic circle responsive-img" alt='someone awesome' src={member.picture} />
              <h5>{member.name}</h5>
              <p className="desc">
              {member.about}
              </p>
              <div className='contact'>
              <a target="_blank" rel="noopener noreferrer" href={member.github}><img alt='github' src="https://img.icons8.com/ios/50/000000/github-filled.png"/></a>
              <a target="_blank" rel="noopener noreferrer" href={member.linkedIn}><img alt='linkedin' src="https://img.icons8.com/ios/50/000000/linkedin-filled.png"/></a>
              </div>
            </div>
          )
        })
      }
      </div>

      <button  className="btn waves-effect waves-light hide-on-med-and-up"onClick={this.clickTop}>Top</button>

      </div>
    )
  }
}
