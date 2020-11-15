
import React, { Component } from 'react';
import { Col , Row, ProgressBar } from 'react-materialize'
import { getSingleSubscriptionIdForUserAndGoal, addSubscription, deleteSubscription } from '../util/util';
import { addSubmission } from '../util/util'
import { upload } from "../util/functions.js"
import Puzzle from './Puzzle'
import '../css/singlegoal.css';

import axios from 'axios'


export default class SingleGoal extends Component {
  state = {
      loggedUserSubId: "",
      didUpload: false,
      image:null,
      goalInfo:[]
    }

  componentDidMount() {
    let { loggedUser } = this.props;
    let userId = loggedUser.id;
    let goalId = this.props.match.params.goal_id;
    this.getGoal()
    this.refreshSubscriptions(userId, goalId)

  }


  componentDidUpdate(prevProps) {
    let { loggedUser } = this.props;
    if (loggedUser.id !== prevProps.loggedUser.id) {
      let userId = loggedUser.id
      let goalId = +this.props.match.params.goal_id
      this.refreshSubscriptions(userId, goalId)
    }
  }

  handleSubscribe = (e) => {
    let { loggedUser, match } = this.props;
    let { loggedUserSubId } = this.state;
    let userId = loggedUser.id;
    let goalId = match.params.goal_id;
      if (e.target.innerText.slice(0,3) === "SUB") {
        addSubscription({ user_id: userId , goal_id: goalId }).then((res) => {
          this.refreshSubscriptions(userId, goalId);
        })
      } else {
        deleteSubscription(loggedUserSubId).then((res) => {
          this.refreshSubscriptions(userId, goalId);
        })
      }
  }
  getGoal = () => {
    axios.get(`/api/goals/${this.props.match.params.goal_id}`)
      .then(res=> {
        this.setState({
          goalInfo:[res.data.data]
        })
      })
  }

  nd = (description) => {
   let arr = (description).split('@$'),
    obj = {
     description: arr[0],
     initiative: arr[1],
     slogan: arr[2]
   }
   return obj
  }
  handleUploadChange = e => {
    if(e.target.files[0]) {
      this.setState({image:e.target.files[0]})
    }
  }

  handleUpload = (e) => {
    e.preventDefault();
    const { image } = this.state
    upload(image, this.successfulUpload)


  }
  successfulUpload = (url) => {
    let { loggedUser, match, submissions } = this.props;
    let { loggedUserSubId } = this.state;
    let newSub = 
    { img_url:"" , 
      goal_id: match.params.goal_id,
      sub_count: submissions.length,
      subscriptions_id: loggedUserSubId
    }
    this.setState({didUpload: true })
    newSub.img_url = url;
    addSubmission(loggedUser.id, newSub)
    this.props.fetchSubmissionsPerGoal(match.params.goal_id)
  }

  refreshSubscriptions = (userId, goalId) => {
    getSingleSubscriptionIdForUserAndGoal(userId, goalId)
      .then((res) => {
          this.props.fetchSubscriptionsPerGoal(goalId);
          let newValue = res.data.subId.length ? res.data.subId[0].id : "" ;
          return this.setState({ loggedUserSubId: newValue });
      })
  }

  render(){
    let { loggedUserSubId, goalInfo } = this.state
    let { submissions, subscriptions, loggedUser } = this.props;

    let percAll = submissions && goalInfo[0] ? (submissions.length/+goalInfo[0].target_value*100).toFixed(2) : 0;
    let countUserSubs = submissions ? (submissions.filter(el => el.user_id === loggedUser.id)).length : null
    let percUser = submissions && goalInfo[0] ? (countUserSubs/+goalInfo[0].target_value*100).toFixed(2) : 0 ;
    return(
      submissions && goalInfo[0] ? (
      <div className="container">
        <div className="goal-header">
          <h4 id="bold">{goalInfo[0].title}</h4>
            <div className="subs">
              <button className="btn waves-effect waves-light" onClick={this.handleSubscribe}> {loggedUserSubId ? "Unsubscribe " : "Subscribe "}{subscriptions ? subscriptions.length : null}</button>
            </div>
        </div>
        <h4>{this.nd(goalInfo[0].description).description}</h4>
        { loggedUser.id && loggedUserSubId ?
        <Row>
          <Col s={12}>
            <h4>Your Contribution</h4>
            <h5>{countUserSubs}/{goalInfo[0].target_value} total pictures</h5>
            <ProgressBar className={percUser > 99 ? "finished":'not-finished'} progress={+percUser} />
          </Col>
        </Row>
        : null }
        <Row>
          <Col s={12}>
            <h4><a id='bold' href={`/community/${goalInfo[0].community_id}`}>{goalInfo[0].community}</a> Contributions</h4>
            <h5>{percAll}%</h5>
            <ProgressBar className={percAll > 99 ? "finished":'not-finished'} progress={+percAll} />
          </Col>
          <div className="container puzzle-area">
            {goalInfo[0].completed
              ? ""
              : loggedUserSubId ? 
                (<div className="file-field input-field">
                  <div className="btn-small waves-effect waves-light">
                  <span>Upload photo</span>
                    <input
                      type="file"
                      name="avatar"
                      accept=".jpg, .jpeg, .png"
                      onChange={this.handleUploadChange}
                    />
                    
                </div>
                <div className="file-path-wrapper">
                  <input className="file-path validate" name='avatarpath' type="text" />
                </div>
                {this.state.image? <button className="btn-small waves-effect waves-light" onClick={this.handleUpload}> Upload</button> :null}
              </div>)
                                  : <div className="file-field input-field"><h5>Subscribe to upload a photo!</h5></div>
              }
            <Puzzle submissions={submissions} isCompleted={goalInfo[0].completed} />
          </div>
        </Row>


      </div>
    ) : ""
    )
  }
}
