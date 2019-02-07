import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from "react-router-dom";
import './Questionary.css';
import RestuantBlock from '../../component/resturantBlock/resturantBlock';
import Modal from '../../component/modal/modal';
import RatingBlock from '../../component/ratingBlock/ratingBlock'
import { Row, Col, Slider, Timeline } from 'antd';
import 'antd/dist/antd.css';
//import 'antd/lib/slider/style/css';
import { Button } from 'antd';


class Questionary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            filled: false
        }
    }

    // handleRateSubmit = (value) => {
    //     console.log(value)
    //     // fetch("url",
    //     // {
    //     //     method: "POST",
    //     //     cache: "no-cache",
    //     //     headers: {
    //     //         "content_type": "application/json"
    //     //     },
    //     //     body: JSON.stringify(value)
    //     // })
    //     // .them(response => response.json())
    // }
    // handleClick = () => {
    //     this.setState({
    //         visible: true,
    //     });
    // }
    // renderBlock() {
    //     return (
    //         <RatingBlock
    //             name="Lily"
    //             genre="Chinese"
    //             url="http"
    //         />
    //     );
    // }
    handleSubmit = () => {
        this.props.history.push('/recom');
    }

    render() {
        // if (this.state.filled == true) {
        //     return <Redirect to='../Home/Home'/>
        // }
        const datas = [
            {
                name: 'Deluca\'s Diner',
                id: 'oeW0vIYd3rUnAPgmD4fEFg',
                title: 'Rate',
            },
            {
                name: 'Eleven',
                id: 'd2ZQRjuizstCTnicysmpMQ',
                title: 'Rate',
            },
            {
                name: 'Kaya',
                id: 'Ul6JwluSTm12PVDIqnNaTg',
                title: 'Rate',
            },
            {
                name: 'Everyday Noodles',
                id: 'hcFSc0OHgZJybnjQBrL_8Q',
                title: 'Rate',
            },
            {
                name: 'Hofbrauhaus Pittsburgh',
                id: 'wmCBxE0PfLZD8sxIwAY59Q',
                title: 'Rate',
            },
            {
                name: 'Noodlehead',
                id: 'dLc1d1zwd1Teu2QED5TmlA',
                title: 'Rate',
            },
            {
                name: 'Proper Brick Oven & Tap Room',
                id: 'NoF90rswXBHESSyDaWeKKA',
                title: 'Rate',
            },
            {
                name: 'täkō',
                id: 'woXlprCuowrLJswWere3TQ',
                title: 'Rate',
            },
            {
                name: 'The Porch at Schenley',
                id: 'Eg_M8eeu9SDEdbP7iUmVbQ',
                title: 'Rate',
            },
            {
                name: 'Bakersfield',
                id: 'Voeq7aGDmCGMjE_SQiHwRA',
                title: 'Rate',
            },
            {
                name: 'Gaucho Parrilla Argentina',
                id: 'u4sTiCzVeIHZY8OlaL346Q',
                title: 'Rate',
            },
            {
                name: 'Primanti Bros',
                id: 'lKom12WnYEjH5FFemK3M1Q',
                title: 'Rate',
            },
            {
                name: 'Nicky\'s Thai Kitchen',
                id: '0PCBt3JKD6IooicImKNBzA',
                title: 'Rate',
            },
            {
                name: 'Point Brugge Café',
                id: 'xcmmTXhuMx2fZF2Bt69F4w',
                title: 'Rate',
            },
            {
                name: 'Sienna Mercato',
                id: 'sMzNLdhJZGzYirIWt-fMAg',
                title: 'Rate',
            },
            {
                name: 'Fat Heads Saloon',
                id: 'LQFmktF43j2NPncKdNd9mg',
                title: 'Rate',
            },
            {
                name: 'Meat & Potatoes',
                id: 'JLbgvGM4FXh9zNP4O5ZWjQ',
                title: 'Rate',
            },
            {
                name: 'Church Brew Works',
                id: 'ejaUQ1hYo7Q7xCL1HdPINw',
                title: 'Rate',
            },
            {
                name: 'Primanti Bros',
                id: 'w_UCGMgok7N9p0XdYBx1VQ',
                title: 'Rate',
            },
            {
                name: 'Butcher and the Rye',
                id: 'SmkYLXEYhzwUZdS6TAevHg',
                title: 'Rate',
            },
        ];
        const colItems = datas.map((data) =>
            <Col className = "rating-block-container" span={8}>
                <RatingBlock 
                    name={data.name}
                    genre={data.genre}
                    id = {data.id}
                    title={data.title}></RatingBlock>
            </Col>
        );
        // console.log(this.props)
        return (
            <div>
                <div className = "ques-title">Have You Ever Been To Any Of These? Rate them before you start, this will help us know you better.</div>
                <Row>{colItems}</Row>
                    {/* <Modal 
                      title = 'Rate Me'
                      visible = {this.state.visible}
                      onClick={() => this.handleClick()}
                      onCancel = {() => this.setState({visible: false})}
                    ></Modal> */} 
                   {/* <Button type="primary" onClick = {() => this.handleSubmit}> */}
                    {/* <Button type="primary" onClick = {() => this.props.onClick}> */}
                    <Button type="primary" onClick = {() => {this.handleSubmit()}}>
                    {/* <Link to="/recom">Finish</Link> */}
                    Finish!
                    </Button>
            </div>)
    };
};
export default withRouter(Questionary);
