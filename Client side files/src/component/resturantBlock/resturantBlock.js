import React from 'react';
import ReactDOM from 'react-dom';
import './resturantBlock.css';
import Star from '../Star/Star';
// import Modal from '../modal/modal';
//button star
class ResturantBlock extends React.Component {
    handleClick(url) {
        console.log("go to resturant");
// open resturant page
    }
    render() {
        const name = this.props.name;
        const rating = this.props.rating;
        const genre = this.props.genre;
        const url = this.props.url;
        // const btn = this.props.btn;
// console.log(this.props)
        return (
            <div>
                <div className = "resturant_name">{name}</div>
                <div className = "resturant_score">
                    <Star value = {rating}></Star>
                    {rating}
                </div>
                <div className = "resturant_gerne">{genre}</div>
                {/* <button 
                    className = "resturant_btn"
                    onClick = {() => this.handleClick(url)}> {btn}
                </button> */}
                {/* <Modal btn = {this.props.btn}></Modal> */}
            </div>
        )
    }
}
export default ResturantBlock;