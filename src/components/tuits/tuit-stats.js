import React, {useEffect, useState} from "react";
import * as serviceU from "../../services/auth-service";


const TuitStats = ({tuit, likeTuit, unlikeTuit}) => {
    const [user, setUser] = useState({});
    console.log(user);
    useEffect( async ()=> {
        const findUser = await serviceU.profile();
        setUser(findUser);
    }, [])
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                {tuit.stats && tuit.stats.replies}
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                {tuit.stats && tuit.stats.retuits}
            </div>
            <div className="col">
                <span onClick={() => likeTuit(tuit)}>
                  {(()=>{
                      if(user && tuit.stats.likeByFlag) {
                          return(<i className="fa-regular fa-thumbs-up" style={{color: 'red'}}/>)
                      }
                      else {
                          return(<i className="fa-regular fa-thumbs-up"/>)
                      }
                  })()}
                  {tuit.stats && tuit.stats.likes}
                </span>
            </div>
            <div className="col">
                <span onClick={()=> unlikeTuit(tuit)}>
                    {(()=>{
                        if(user && tuit.stats.dislikeByFlag) {
                            return(<i className="fa-regular fa-thumbs-down" style={{color: 'red'}}/>)
                        }
                        else {
                            return(<i className="fa-regular fa-thumbs-down"/>)
                        }
                    })()}
                    {tuit.stats && tuit.stats.dislikes}
                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export  default TuitStats;