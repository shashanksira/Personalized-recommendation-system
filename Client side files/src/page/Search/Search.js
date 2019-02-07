import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Search.css';
import { List, Icon } from 'antd';
import { Input } from 'antd';
import { Rate} from 'antd';
import ModalForm from '../../component/ModalForm/ModalForm';
import axios from 'axios';

const Search = Input.Search;

const IconText = ({ onClick, type, text}) => (
    <span>
      <Icon onClick = {onClick} type={type} style={{ marginRight: 8 }} />
      <span className = 'likeTxt'>{text}</span>
    </span>
  );
class SearchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datas: this.props.data,
            // value: '',
            // isSearched: false
            // url: ''
        }
    }
    handleLike = (name, bId) => {
        // console.log(name + bId)
        // console.log('liked')
        // console.log(this.state.datas)
        this.handleLikeSubmit(bId, 'Yimeng')
        // console.log(this.state.data.title)
        // alert('liked')
    }

    handleLikeSubmit = async(bId, uName) => {
        const like = this.postLike(bId, uName)
        .then(response => {
            if (response) {
                console.log(response)
            }
        })
    } 

    postLike = (bId, uName) => {
        try {
            return axios.post('http://localhost:5000/like', {
                "user_id": uName,
                "business_id": bId

            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const { datas } = this.state;
        const listData = [];
        let n = 1;
        datas.map((data) => {
            listData.push({
                href: "",
                title: data.name,
                src: require(('../../assest/res' + n + '.jpg')),
                description: data.categories,
                content: "",
                rating: data.stars,
                business_id: data.business_id,
                score: data.score
            })     
            n ++
        });
    
        return (
            <div className = 'searchListContainer'>
                <List
                    className = 'search-list'
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            // console.log(page);
                        },
                        pageSize: 8,
                    }}
                    dataSource={listData}
                    footer={<div><b>ant design</b> footer part</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            extra={<img width={272} alt="logo" src={item.src} />}
                        >
                            <List.Item.Meta
                                // avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            <div className = 'searchScore'>Recommendation Score: {item.score}</div>
                            <IconText 
                            onClick={() => this.handleLike(item.title, item.business_id)}
                            name = {item.title} bId = {item.business_id} type="like-o" text="Thumb up to like this result" />
                            {item.content}
                            <div className = 'searchRate'><Rate disabled defaultValue={item.rating} /></div>
                            {/* <Modal 
                      title = 'Rate Me'
                      visible = {this.state.visible}
                      onClick={() => this.handleClick()}
                      onCancel = {() => this.setState({visible: false})}
                    ></Modal>  */}
                    <ModalForm 
                        name = {item.name}
                        cate = {item.categories}
                        business_id = {item.business_id}></ModalForm>
                        </List.Item>
                    )}
                    
                />
            </div>
        )
    }
}

class SearchPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            // userId: "Yimeng",
            data: [],
            value: '',
            isSearched: false
        }
    }
    handleSearch = (value, userId) => {
        // console.log(value)
        this.submitSearch(value, userId)
    }

    submitSearch = async(value, userId) => {
        const rate = this.getSearch(value, userId)
        .then(response => {
            if (response.data) {
                console.log('response')
                // console.log(response.data.result)
                this.setState({
                    isSearched: true,
                    data: response.data.result.slice(0,10)
                })
            }
        })
    }


    getSearch = (value, userId) => {
        try {                 
            return axios.get("http://localhost:5000/adaptivesearch/" + value + "/" + "Yimeng")
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const value = this.state.value
        const isSearched = this.state.isSearched
        const data = this.state.data
        return (
            <div className = 'searchBar'>
                <Search
                    placeholder="input search text"
                    onSearch={this.handleSearch}
                    enterButton
                />
                <div>
                    {isSearched && <SearchList data = {data}></SearchList>}
                </div>
            </div>)
    };
};
export default SearchPage;

