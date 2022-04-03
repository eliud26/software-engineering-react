import React from "react";

const TuitStats = ({tuit, likeTuit, unlikeTuit}) => {
    return (
        <div className="row mt-2">
            <div className="col">
                <i className="far fa-message me-1"/>
                <span className="ttr-stats-replies">{tuit.stats && tuit.stats.replies}</span>
            </div>
            <div className="col">
                <i className="far fa-retweet me-1"/>
                <span className="ttr-stats-retuits">{tuit.stats && tuit.stats.retuits}</span>
            </div>
            <div className="col">
                <span className="ttr-like-tuit-click" onClick={() => likeTuit(tuit)}>
                  {(()=>{
                      if(tuit.stats.likeByFlag) {
                          return(<i className="fa-regular fa-thumbs-up" style={{color: 'red'}}/>)
                      }
                      else {
                          return(<i className="fa-regular fa-thumbs-up"/>)
                      }
                  })()}
                  <span className="ttr-stats-likes">{tuit.stats && tuit.stats.likes}</span>
                </span>
            </div>
            <div className="col">
                <span className="ttr-dislike-tuit-click" onClick={()=> unlikeTuit(tuit)}>
                    {(()=>{
                        if(tuit.stats.dislikeByFlag) {
                            return(<i className="fa-regular fa-thumbs-down" style={{color: 'red'}}/>)
                        }
                        else {
                            return(<i className="fa-regular fa-thumbs-down"/>)
                        }
                    })()}
                    <span className="ttr-stats-dislikes">{tuit.stats && tuit.stats.dislikes}</span>
                </span>
            </div>
            <div className="col">
                <i className="far fa-inbox-out"/>
            </div>
        </div>
    );
}
export  default TuitStats;