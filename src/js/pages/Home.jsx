import React from 'react';

import NewsStore from '../stores/newsStore';
import * as NewsActions from '../actions/newsAction';
import Sources from '../components/Sources.jsx';

/**
 * Home React Component
 */
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      sources: NewsStore.getSources(),
    };
    this.sources = this.getNews.bind(this);
    this.filter = this.filterSources.bind(this);
  }
  // componentWillMount - Runs when component is loaded
  componentWillMount() {
    NewsActions.getSource();
    NewsStore.on('changes', this.sources);
  }
  // componentWillMount - Runs when component is loaded
  componentWillUnmount() {
    NewsStore.removeListener('changes', this.sources);
  }
  // getArticle - Sets state of sources
  getNews() {
    this.setState({
      sources: NewsStore.getSources(),
    });
  }
  /**
   * filterSources - Searches through available sources
   * @param {event} event - Takes in an onChange event
   * Sets the state of sources to the result
   */
  filterSources(event) {
    const searchList = [];
    NewsStore.getSources().map((source) => {
      if (source.name.toLowerCase()
        .search(event.target.value.toLowerCase()) !== -1) {
        searchList.push(source);
      }
    });
    this.setState({
      sources: searchList,
    });
  }

  render() {
    const { sources } = this.state;

    const NewsComponents = sources.map(source => <Sources key={source.id} {...source} />);
    return (
      <div className="container">
        <div className="row">
          <div className="col m8">
            <input
              id="source_search"
              type="text"
              className="validate"
              placeholder="Search for sources"
              onChange={this.filter} />
          </div>
          <div className="col m4">
            <form>
              <select className="browser-default input-field">
                <option value="">All</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="gaming">Gaming</option>
                <option value="general">General</option>
                <option value="music">Music</option>
                <option value="politics">Politics</option>
                <option value="science-and-nature">Science and Nature</option>
                <option value="sport">Sport</option>
                <option value="technology">Technology</option>
              </select>
            </form>
          </div>
        </div>
        <div className="row">
          <div>
            {NewsComponents}
          </div>
        </div>
      </div>
    );
  }
}