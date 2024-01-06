import { cleanup } from '@testing-library/react';
import React, { useEffect, useState } from 'react'
import FunctionNewsItem from './FunctionNewsItem';
import wineImage from "./342373.jpg";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import FunctionSpinner from './FunctionSpinner';


const FunctionNews = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) =>{
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

    const updateNews = async () =>{
        props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }

    const fetchMoreData = async () =>{
        if(page < Math.ceil(totalResults/props.pageSize)){
            setLoading(true);
            props.setProgress(0);
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
            setPage(page + 1); // "let url" & is line ko upar niche isliye karna pada kyuni Infinite Scroll m Error aa rha tha, yeh problem CLASS Bases Componenet m nhi h
            let data = await fetch(url);
            props.setProgress(30);
            let parsedData = await data.json();
            props.setProgress(70);
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setLoading(false);
            props.setProgress(100);
          
        }
      }
    useEffect(() => {
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`

    }, [])

  return (
    <div>
      <>
          <h1 className="text-center" style={{margin: "35px 0px",marginTop:'90px'}}>NewsMonkey Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
          {loading && <FunctionSpinner/>}
          <InfiniteScroll dataLength={articles} next={fetchMoreData} hasMore={articles.length != totalResults} loader={loading?<FunctionSpinner/>:null}>
            <div className="container">
              <div className="row">
                  {articles.map((element) => {  
                    return(
                    <div key={element.url} className="col-md-4 my-2">
                      <FunctionNewsItem  title={element.title} description={element.description} newsUrl={element.url} imageUrl= {element.urlToImage?element.urlToImage:wineImage} author={element.author} date={element.publishedAt} source ={element.source.name}/>
                    </div>)
                  })}
              </div>
            </div>
          </InfiniteScroll>
        </>
    </div>
  )
}

FunctionNews.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general" 
}

FunctionNews.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default FunctionNews
