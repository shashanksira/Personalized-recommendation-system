import React from 'react';
import ReactDOM from 'react-dom';
import './ratingBlock.css';
import { Rate } from 'antd';
import axios from 'axios';


class RatingBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            userId: "test",
            businessId: this.props.id
        }
    }
    // state = {
    //     value: 0,
    // }
    handleChange = (value) => {
        this.setState({ value });
        this.handleRateSubmit(this.state.userId, this.state.businessId, value)
    }
    // handleClick(url) {
    //     console.log("go to resturant");
    //     // open resturant page
    // }

    handleRateSubmit = async(userId, businessId, value) => {
        console.log(userId + " " + businessId+ " " + value)
        const rate = this.postRate(userId, businessId, value)
        .then(response => {
            if (response.data.user_id) {
                console.log(response.data.user_id)
            }
        })
    }

    postRate = (userId, businessId, value) => {
        try {
            return axios.post('http://localhost:5000/write', {
                "user_id": "Yimeng",
                "stars": value,
                "text": "",
                "business_id": businessId

            })
        } catch (error) {
            console.log(error)
        }
    }
    // handleRateSubmit = (value) => {
        // fetch("url",
        // {
        //     method: "POST",
        //     cache: "no-cache",
        //     headers: {
        //         "content_type": "application/json"
        //     },
        //     body: JSON.stringify(value)
        // })
        // .them(response => response.json())
    // }
    // componentDidMount() {
    //     fetch("https://api.example.com/items")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //           this.setState({
    //             isLoaded: true,
    //             items: result.items
    //           });
    //         },
    //         // Note: it's important to handle errors here
    //         // instead of a catch() block so that we don't swallow
    //         // exceptions from actual bugs in components.
    //         (error) => {
    //           this.setState({
    //             isLoaded: true,
    //             error
    //           });
    //         }
    //       )
    //   }
    

    render() {
        const name = this.props.name;
        const genre = this.props.genre;
        const { value } = this.state;
        return (
            <div className = "rating-container">
                <div className="resturant_name">{name}</div>
                <div className="resturant_gerne">{genre}</div>
                <span>
                    <Rate onChange={this.handleChange} value={value} />
                    <span className="ant-rate-text"></span>
                </span>
            </div>
        )
    }
}
export default RatingBlock;