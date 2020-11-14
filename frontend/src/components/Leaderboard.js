import React, { useEffect } from 'react';
import { getLeaderboard  } from '../util/util';
export default function Leaderboard (){
    

    useEffect(()=> {
        const getData = async()=> {
            let resp = await getLeaderboard();
            console.log(resp)
        }
        getData();
    },[])

    return(<div>Leaderboard</div>)

}