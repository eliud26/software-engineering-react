import React from "react";

export default class TuitStats extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message"/>
            {this.props.tuit.stats && this.props.tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet"/>
          {this.props.tuit.stats && this.props.tuit.stats.retuits}
        </div>
        <div className="col">
          <i className="far fa-heart"/>
          {this.props.tuit.stats && this.props.tuit.stats.likes}
        </div>
        <div className="col">
          <i className="far fa-inbox-out"/>
        </div>
      </div>
    );
  }
}