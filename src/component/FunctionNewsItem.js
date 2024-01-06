import React from 'react'

const FunctionNewsItem = (props) => {
    let {title,description,imageUrl,newsUrl, author, date, source} = props;
    let dateGMT = new Date(date);
  return (
    <>
        <div className="card" >
        <div style={{display:'flex',justifyContent:'flex-end', position:'absolute', right:'0'}}> 
          <span className=" translate-end badge rounded-pill bg-danger"> {source} </span>
        </div>
          <img src={imageUrl} className="card-img-top" alt="..." style={{minHeight:"15rem",maxHeight:"15rem"}}/>
          <div className="card-body">
            <h5 className="card-title" style={{minHeight:"7rem",maxHeight:"7rem"}}>{title}...</h5>
            <span className="badge bg-success">Success</span>
            <p className="card-text" style={{minHeight:"10rem",maxHeight:"10rem"}}>{description}...</p>
            <p className="card-text" style={{minHeight:"3rem",maxHeight:"3rem"}}><small className="text-primary" >By {author?author:"Unknown"} on {dateGMT.toGMTString() }</small></p>
            <a href={newsUrl} target="_blank" className="btn btn-dark">
              Read More
            </a>
          </div>
        </div>
      </>
  )
}

export default FunctionNewsItem
