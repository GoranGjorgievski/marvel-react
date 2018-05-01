import React, { Component } from 'react';
import './CardComponent.css';

class CardComponent extends Component {
  render() {
    return (
     <div className='com-xs-12 col-sm-6 col-md-3'>
      <div className="card">
        <div className="thumbnail">
          <img className="card-img-top" src={`${this.props.item.thumbnail.path}.${this.props.item.thumbnail.extension}`} alt="Card" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.props.item.name}</h5>
          {this.props.item.bookmarked ? 
          <span className="badge badge-pill badge-success" 
                onClick={() => this.props.toggleBookmark(this.props.item.id)}>
                Bookmarked
          </span> 
          : <span className="badge badge-pill badge-warning" 
                onClick={() => this.props.toggleBookmark(this.props.item.id)}>
                Bookmark
          </span>}
          
        </div>
      </div>
     </div>
    );
  }
}

export default CardComponent;
