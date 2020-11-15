import React, { useEffect, useState } from 'react';
import { getLeaderboard  } from '../../util/util';
import "./leaderboard.css"
import { borough } from '../../util/util.js'


export default function Leaderboard (){
    
    const [ topUsers, setTopUsers ] = useState(null); 

    useEffect(()=> {
        const getData = async()=> {
            let resp = await getLeaderboard();
            console.log(resp.data.top_users);

            setTopUsers(resp.data.top_users);
        }
        getData();
    },[])
    return(
    <div className="container">
        <ol className="leaderboard">
        {topUsers ?
           topUsers.map(user => {
               console.log(user)
            return (
                <li className="placing" 
                    style={{
                        background:`url(${borough[user.community_id].imgUrl})`,
                        backgroundRepeat:"no-repeat",
                        backgroundSize:"cover"
                            }}
                    key={user.username} >
                    <div className="placing-img-container">
                        <p>{user.username}</p>
                        <img src={user.avatar_img} alt="top user"/>

                    </div>
                    <h4>{borough[user.community_id].communityName}</h4>
                    <h4>{` Submissions: ${user.submissions_count}`}</h4>
                </li>
            )
            }) 
            : "No Submissions yet"      
        }
        </ol>
        

    </div>
    )

}