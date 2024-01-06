import React, { Component } from "react";

export class NewsItem extends Component {
    // constructor(){
    //     super();
    //     console.log("Cosntructor From NewsItem")
    // }
  render() {
    let {title,description,imageUrl,newsUrl, author, date, source} = this.props;
    let dateGMT = new Date(date);

    return (
      <>
        <div className="card">
        <div style={{display:'flex',justifyContent:'flex-end', position:'absolute', right:'0'}}> 
          <span className=" translate-end badge rounded-pill bg-danger"> {source} </span>
        </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <span className="badge bg-success">Success</span>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-primary">By {author?author:"Unknown"} on {dateGMT.toGMTString() }</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItem;
