import React from 'react';
import { connect } from 'react-redux';
import { onInputChange, setDisplayList, setIndex, filterBooks } from '../actions';
import BookList from './BookList';
import Axios from 'axios';
import { Input, Button } from 'semantic-ui-react';
import '../styles/bookTask.css';
import { Dropdown } from 'semantic-ui-react'

const baseUrl = 'https://www.googleapis.com/books/v1/volumes?'

class BookTask extends React.Component {

    componentDidMount() {
        this.fetchBookList();
    }

    handleLoadMore = () => {
        this.props.setIndex()
        this.fetchBookList(this.props.bookReducer.index);

    }

    fetchBookList = async (index = 0) => {
        const key = 'key=AIzaSyCyZIXzX8n9nIduM6BFbAOR3KaT1Ll1_2w'
        const search = `&q=${this.props.bookReducer.inputValue || 'Javascript'}`
        console.log('index', index);
        const response = await Axios.get(`${baseUrl}${key}${search}&maxResults=40&startIndex=${index}`);
        this.props.setDisplayList(response.data.items);
        this.props.onInputChange('');
    }

    onFilter = (value) => {
      if (value !== 'all') this.props.filterBooks(JSON.parse(localStorage.getItem('bookMarkIds')));
      else this.fetchBookList(0);
    }

    render() {

        const { bookReducer } = this.props;

        return (
            <div>
                <div className="search-box">
                    <div >
                        <Input className="book-task-input" icon="search"  placeholder="search..."
                            onChange={(e) => this.props.onInputChange(e.target.value)}
                            value={bookReducer.inputValue} />
                    </div>
                    <div>
                        <Button className="book-task-button" primary onClick={() => this.fetchBookList()}>search</Button>
                    </div>
                </div>
                <br />
                <div className="dropdown">
                <Dropdown
                  placeholder='Select Books' 
                  search
                  selection
                  options={[
                    {key: '0', value: 'all', text: 'All'},
                    {key: '1', value: 'bookmarked books', text: 'Bookmarked Books'} 
                  ]}
                  onChange={(e, { value }) => this.onFilter(value)}
                />
                </div>
                <div>
                    <BookList list={bookReducer.list} />
                </div>
                <br />
                <div>
                    <Button primary onClick={() => this.handleLoadMore()}>
                        Load More
                    </Button>
                </div>
            </div>

        );
    }
}

const mapStateToProps = ({ bookReducer }) => ({ bookReducer });

export default connect(mapStateToProps, { onInputChange, setDisplayList, setIndex, filterBooks })(BookTask);

