import React, { Component } from 'react';
import { VisualDisplay } from './VisualDisplay'
import { Tab, Tabs } from 'react-materialize'
import './home.css';
import GoalsListContainer from '../../containers/GoalsListContainer';
import Leaderboard from './Leaderboard.js';


class Home extends Component {
  constructor() {
    super()
    this.state = {
      borough:0,
      subjects:'00'
    }

  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.borough !== this.state.borough) {
      window.scroll(0,document.body.scrollHeight)
    }
  }
  componentDidMount() {
    this.props.fetchTonnage();
  }
  handleChange = e => {
    this.setState({
      borough:e.target.value
    })
    window.scroll(0,document.body.scrollHeight)
  }
  tabChange = e => {
    this.setState({
      subjects:e
    })

  }
  dropDown = () => {
    return(
      <div className="container borough-select">
        <div className ='input-field col s6'>
          <select name='borough'  className={"select-borough"} onChange={this.handleChange}>
            <option value='0'>Select Borough</option>
            <option value='1'>Manhattan</option>
            <option value='2'>Queens</option>
            <option value='3'>Bronx</option>
            <option value='4'>Brooklyn</option>
            <option value='5'>Staten Island</option>
          </select>
        </div>
      </div>
    )
  }

    render() {
    const { subjects } = this.state
    let list;
    if(subjects === '00'){
      list = <GoalsListContainer boroughId={this.state.borough}/>
    }
      return (
        <>
        <div className="col s6">
          <Tabs onChange={this.tabChange} className=" tab-demo z-depth-1" options={{swipeable: true}}>

            <Tab title="Monthly Tonnage" active>
            <div className="container">
              <h4 id='bold'>Take a dive in NYC's trash pile.</h4>
              </div>
                <div id="demo">
                <div className='iframe'>

                <VisualDisplay />
                </div>
                <div className="container">
                  <p>* Each circle represents Monthly Tonnage for each borough between 2018-2019, according to NYC Open Data API.</p>
                </div>
                <h4 className="center" id="bold">OK. How Can I Help?</h4>
              </div>
            </Tab>

            <Tab title="Leaderboard">
              <div className="container"><Leaderboard/></div>
            </Tab>
          </Tabs>
          </div>
          {subjects === '00'? this.dropDown():''}

          {list}

        </>
      )
    }
}

export default Home;
