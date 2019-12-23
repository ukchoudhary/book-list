import React from 'react';
import Images from '../images/imageNotAvailable.png';
import { Image, Rating, Icon } from 'semantic-ui-react'
import '../styles/bookList.css';
import { connect } from 'react-redux';
import { setBookmarkIcon } from '../actions';

class BookList extends React.Component {

  componentDidMount() {
    if(!localStorage.getItem('bookMarkIds')){
      localStorage.setItem('bookMarkIds', JSON.stringify([]));
    }
    this.handleBookmark();
  }

  handleBookmark = (id) => {
    let bookMark = localStorage.getItem('bookMarkIds');
    bookMark = JSON.parse(bookMark)
    let index = bookMark.indexOf(id);
    if (index > -1) {
      bookMark.splice(index, 1);
    } else bookMark.push(id);
    localStorage.setItem('bookMarkIds', JSON.stringify(bookMark));
    this.props.setBookmarkIcon(bookMark);
  }

  render() {
    const { list } = this.props;
    return (
      <div>
        <div>
          {list.map(item =>
            <div className="book-list" key={item.etag}>
              <div className="image-box">
                <Image size="small" verticalAlign='middle'
                  circular centered
                  src={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail || Images}
                  alt={item.volumeInfo.title}
                />
              </div>
              <div className="contents">
                <h3 style={{ color: "blue" }}>{item.volumeInfo.title}</h3>
                <br />
                <Rating icon='star' defaultRating={item.volumeInfo.averageRating} maxRating={5}
                />
                <br />
                <h6 style={{ color: "red" }}>MRP: {item.saleInfo.listPrice && item.saleInfo.listPrice.amount} Rupees</h6>
                <br />
                <a
                  style={{
                    borderStyle: "solid",
                    backgroundColor: "	rgb(255, 255, 102)",
                    borderColor: "rgb(255, 255, 102)",
                    color: "rgb(0, 102, 0)"
                  }}
                  target="blank" href={item.saleInfo.buyLink}>
                  Buy Now
                </a>
              </div>
              <div className="description">
                <Icon
                  name={this.props.bookReducer.icon.indexOf(item.etag) > -1 ? "bookmark" : "bookmark outline"}
                  size="big"
                  onClick={() => this.handleBookmark(item.etag)}
                />
                <span>
                  {item.volumeInfo.description}
                </span>
              </div>
            </div>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ bookReducer }) => ({ bookReducer });

export default connect(mapStateToProps, { setBookmarkIcon })(BookList);