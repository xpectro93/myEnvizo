import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Row, Col, Collection, CollectionItem, Icon, Button } from 'react-materialize';
import './community.css'
import Timeago from 'react-timeago';
import { borough } from "../../util/util.js"
let defaultPic = 'https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-outline-user-icon-png-image_1727916.jpg'

const userAction = {
  joined:{
    link: () =><>has joined the community.</>
  },
  uploaded:{
    link:(activity)=><> <Link to={`/profile/${activity.usersid}` } className='communityActivity_username'>{activity.username}</Link> uploaded a photo to <Link to={`/goal/${activity.goal_id}`} className='communityActivity_link'>{activity.title}</Link>.</>
  },
  subscribed: {
    link: (activity)=> <> <Link to={`/profile/${activity.usersid}` } className='communityActivity_username'>{activity.username}</Link> has subscribed to <Link to={`/goal/${activity.goal_id}`} className='communityActivity_link'>{activity.title}</Link>.</>
  },
  milestone: {
    actionText: "has completed",
    link: (activity)=>  <>{activity.name} has completed <Link to={`/goal/${activity.goal_id}`} className='communityActivity_link'>{activity.title}</Link> goal.</>
  }

}
class CommunityProfile extends Component {
  componentDidMount() {
    this.props.fetchAllCommunityActivity(this.props.match.params.id);
    this.props.fetchAllGoalsPerCommunity(this.props.match.params.id);
  }

  getActivities = () => {
    const { activity } = this.props;
    if (activity) {
      const activityList = activity.map((activity, i) => {
        let img = activity.avatar_img ? activity.avatar_img : defaultPic
        return (
          <CollectionItem className='avatar' key={i +activity.type} >
            <img src={img} alt="" className="circle" />
            <p className = "title left" >
            {userAction[activity.type].link(activity)}
            </p>
            <br />
            <p className='left grey-text'><Timeago date= {activity.time_stamp}/></p>
          </CollectionItem>)

      })
      return activityList;
      }
    }


  render() {
    let comm_id = this.props.match.params.id
    let goalsList;
    if (this.props.community ) {
      goalsList = this.props.community.data.map((goals, i) => {
            return (

                <CollectionItem className="community-goal" key={`${goals.title} ${i}`} onClick={()=>this.props.history.push(`/goal/${goals.id}`)}>
                  {goals.title}
                  <Link to={`/goal/${goals.id}`} className='secondary-content'>
                    <Icon>
                      arrow_forward
                    </Icon>
                  </Link>
                </CollectionItem>

            )
          })
    }


    return (
      <div className='community_profile'>
        <Row className='center'>
          {/* Communityside */}
          <Col l={4} className='push-l1  m10 s12 black-text z-depth-3 try'>
            <Collection className='avatar'>

              <div className="pic-container">
                <img src={borough[comm_id].imgUrl} alt="borough" className='borough responsive-img' />
                <h4>{borough[comm_id].communityName}</h4>
                <h5>Goals</h5>
              </div>


              { goalsList }
              <CollectionItem>
                  <Button type="submit" waves="light">
                  <Link to={`/goals/community/${this.props.match.params.id}`} className='secondary-content'>
                      <div className='white-text'>
                      Community Goals
                      <Icon right>
                      arrow_forward
                      </Icon>
                      </div>
                  </Link>
                  </Button>
              </CollectionItem>
            </Collection>
          </Col>

          {/* Activityside */}
          <Col l={5} className='offset-l2 m10 s12 z-depth-3 community-activity'>
            <Collection header='Community Feed'>
            {this.getActivities()}
            </Collection>
          </Col>
        </Row>
      </div>
    )
  }
}

export default CommunityProfile;
