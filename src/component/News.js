import React, { Component } from "react";
import NewsItem from "./NewsItem";
import wineImage from "./342373.jpg";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

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
            totalResults: 0,

            
        }
        document.title = ` ${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    }

    updateNews = async () =>{
      this.props.setProgress(0);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({articles:parsedData.articles, 
          totalResults: parsedData.totalResults,
          loading:false
      });
      this.props.setProgress(100);
      console.log(this.props.apiKey);

    }
    async componentDidMount(){
      this.updateNews();
    }
    fetchMoreData = async () =>{
      if(this.state.page < Math.ceil(this.state.totalResults/this.props.pageSize)){
        this.setState({
          page:this.state.page + 1,
          loading:true
        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles:this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults,
            loading:false
        });
      }
    }
    
    render() {
      return (
        <>
          <h1 className="text-center" style={{margin: "40px 0px",marginTop:'90px'}}>NewsMonkey Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
          <InfiniteScroll dataLength={this.state.articles} next={this.fetchMoreData} hasMore={this.state.articles.length != this.totaoResults} loader={this.state.loading?<Spinner/>:null}>
            <div className="container">
              <div className="row">
                  {this.state.articles.map((element) => {  
                    return(
                    <div key={element.url} className="col-md-4 my-2">
                      <NewsItem  title={element.title} description={element.description} newsUrl={element.url} imageUrl= {element.urlToImage?element.urlToImage:wineImage} author={element.author} date={element.publishedAt} source ={element.source.name}/>
                    </div>)
                  })}
              </div>
            </div>
          </InfiniteScroll>
        </>
      );
    }
}

export default News;
