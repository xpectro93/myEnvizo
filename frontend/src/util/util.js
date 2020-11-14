import axios from 'axios';
//Data: Tonnage
export const getTonnage = () => axios.get("https://data.cityofnewyork.us/resource/ebb7-mvp5.json?$limit=5000")

export const getAllGoals = () => axios.get("/api/goals")
export const getAllGoalsPerCommunity = (id) => axios.get(`/api/goals/community/${id}`)
export const getAllUsersPerGoal = (id) => axios.get(`/api/goals/${id}/users`)

export const getAllSubscriptions = () => axios.get("/api/subscriptions/")
export const getAllUsers = () => axios.get('/api/users')
export const getAllSubmissionsPerGoal = (id) => axios.get(`/api/submissions/goal/${id}`)
export const getAllSubscriptionsPerGoal = (id) => axios.get(`/api/subscriptions/goal/${id}`);

//submissions
export const addSubmission = (userId, sub) => axios.post(`/api/submissions/user/${userId}`, sub)
export const getLeaderboard = () => axios.get('/api/submissions/top');
//User
export const getSingleSubscriptionIdForUserAndGoal = (userId, goalId) => axios.get(`/api/subscriptions/${userId}/${goalId}`)
export const addSubscription = (subscription) => axios.post(`/api/subscriptions/new`, subscription)
export const deleteSubscription = (subscriptionId) => axios.delete(`/api/subscriptions/${subscriptionId}`)
export const getSubscriptionsForAUser = (user_id) => axios.get(`/api/subscriptions/user/${user_id}`)
export const getActivityPerUser = (user_id) => axios.get(`/api/users/activity/${user_id}`)

//Community
export const getAllActivityForACommunity = (community_id) => axios.get(`/api/communities/${community_id}/activity`)

export const borough = {
    1:{imgUrl:'https://img3.goodfon.com/wallpaper/nbig/a/9b/new-york-city-new-york-1271.jpg',
       communityName:'Manhattan'},
    2:{imgUrl:'https://pbs.twimg.com/media/Drb0hVBWwAUvJSr.jpg',
       communityName:'Queens'},
    3:{imgUrl:'https://cdn-assets.alltrails.com/uploads/photo/image/19326941/extra_large_a08958fc25b15bb98cf4e1d17f1443c1.jpg',
       communityName:'Bronx'},
    4:{imgUrl:'http://s1.1zoom.net/big0/603/Australia_Rivers_Boats_Brooklyn_Hawkesbury_River_540885_1280x800.jpg',
       communityName:'Brooklyn'},
    5:{imgUrl:'https://cdn2.vox-cdn.com/uploads/chorus_asset/file/6695497/07_Kensinger_Mill_Creek_DSC_8839.0.jpg',
       communityName:'Staten Island'}
  }
