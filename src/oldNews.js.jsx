import React, { Component } from "react";
import NewsItem from "./NewsItem";
import wineImage from "./342373.jpg";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general" 
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) =>{
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }
    constructor(props){
        super(props);
        this.state = {
            articles: [],
            loading:false,
            page:1,
        }
        document.title = ` ${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    updateNews = async () =>{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0488a037ce0c4b199949a1c455910040&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles:parsedData.articles, 
          totalResults: parsedData.totalResults,
          loading:false
      });
    }
    async componentDidMount(){
      this.updateNews();
    }
    handlePrevClick = async () =>{
      this.setState({
            page:this.state.page - 1
      });
      this.updateNews();
    }
    handleNextClick = async () =>{
      if(this.state.page < Math.ceil(this.state.totalResults/this.props.pageSize)){
        this.setState({
              page:this.state.page + 1
        });
        this.updateNews();
      }
    }

    render() {
      return (
        <div className="container my-3">
        <h1 className="text-center" style={{margin: "40px 0px"}}>NewsMonkey Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner/>}
          <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {  
            return(
            <div key={element.url} className="col-md-4 my-2">
              <NewsItem  title={element.title} description={element.description} newsUrl={element.url} imageUrl= {element.urlToImage?element.urlToImage:wineImage} author={element.author} date={element.publishedAt} source ={element.source.name}/>
            </div>)
          })}
          </div>
          <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      );
    }
}

export default News;
