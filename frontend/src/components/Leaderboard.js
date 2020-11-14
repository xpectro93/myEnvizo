import React, { useEffect, useState } from 'react';
import { getLeaderboard  } from '../util/util';

const communityIds ={
    1:"Manhattan",
    2:"Queens",
    3:"Bronx",
    4:"Brooklyn",
    5:"Staten Island"
}
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
    <div>
        <ol>
        {topUsers ?
           topUsers.map(user => {
               console.log(user)
            return (
                <li className="placing" key={user.username} ><h3>{user.username}</h3>
                    <img src={user.avatar_img} alt="top user"/>
                    <h4>{communityIds[user.community_id]}</h4>
                    <h4>{user.submission_count}</h4>
                </li>
            )
            }) 
            : "No Submissions yet"      
        }
        </ol>
        

    </div>
    )

}