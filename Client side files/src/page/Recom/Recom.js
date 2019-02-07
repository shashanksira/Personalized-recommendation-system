import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Recom.css';
import { List, Icon, Avatar} from 'antd';
import { Rate } from 'antd';
import ModalForm from '../../component/ModalForm/ModalForm';
import Axios from 'axios';
import ava from './ava.jpg'

class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            userId: "Yimeng",
            data: []
        }
    }
    handleClick = () => {
        this.setState({
            visible: true,
        });
    }
    //request data and set state, userId?
    requestRecom = async () => {
        const recom = this.getRecom(this.state.userId)
            .then(response => {
                if (response) {
                    console.log("h:" + response.data)
                    this.setState({
                        data: response.data.result
                    })
                }
            })
    }

    //request data 
    getRecom = (userId) => {
        try {
            return Axios.get("http://localhost:5000/recommend/" + userId)
        } catch (error) {
            console.log(error)
        }
    }
    componentWillMount() {
        this.requestRecom();
        // this.state.data.map((data) => {
        //     listData.push({
        //         name:data.name
        //     })      
        //     });
    }
    render() {
        const datas = [
            {
                href: '',
                title: `Bird On The Run`,
                src: require('../../assest/res1.jpg'),
                description: 'Chicken Shop',
                // content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                rating: 2,
                bId: 'oeW0vIYd3rUnAPgmD4fEFg'
            },
            {
                href: '',
                title: `El Mecs`,
                src: require('../../assest/res9.jpg'),
                description: 'Mexican',
                // content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                rating: 3,
                bId: 'd2ZQRjuizstCTnicysmpMQ'
            },
            {
                href: '',
                title: `Hidder Harbor`,
                src: require('../../assest/res2.jpg'),
                description: 'Hawaiian',
                // content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                rating: 4,
                bId: 'Ul6JwluSTm12PVDIqnNaTg'
            },
            {
                href: '',
                title: `Independent Brewing Company`,
                src: require('../../assest/res3.jpg'),
                description: 'Pubs',
                // content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
                rating: 1,
                bId: 'hcFSc0OHgZJybnjQBrL_8Q'
            },
            // {
            //     href: '',
            //     title: `Aladdin Eatery`,
            //     src: require('../../assest/res4.jpg'),
            //     description: 'Middle Eastern',
            //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     rating: 2
            // },
            // {
            //     href: '',
            //     title: 'Ramen Bar',
            //     src: require('../../assest/res5.jpg'),
            //     description: 'Ramen',
            //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     rating: 3
            // },
            // {
            //     href: '',
            //     title: `Green Peppe`,
            //     src: require('../../assest/res6.jpg'),
            //     description: 'Korean',
            //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     rating: 4
            // },
            // {
            //     href: '',
            //     title: `El Mecs`,
            //     src: require('../../assest/res7.jpg'),
            //     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     rating: 2
            // },
            // {
            //     href: '',
            //     title: `El Mecs`,
            //     src: require('../../assest/res8.jpg'),
            //     description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
            //     content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
            //     rating: 1
            // },
        ];

        const listData = [];
        //  datas.map((data) => {
        //     listData.push({
        //         href: data.href,
        //         title: data.title,
        //         src: data.src,
        //         description: data.description,
        //         content: data.content,
        //         rating: data.rating,
        //         bId: data.bId
        //     })      
        //     }

        // map data to listData

        // this.state.data.map((data) => {
        //     listData.push({
        //         name:data.name
        //     })      
        //     }
        // );
        const { data } = this.state;
        data.map((data) => {
            listData.push({
                title: data.name,
                bId: data.business_id,
                description: data.address
            })
        })

        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );
        return (
            <div className = 'recom'>
                <List className = 'recom-list'
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 8,
                    }}
                    dataSource={listData}
                    // footer={<div><b>ant design</b> footer part</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                            // extra={<img width={272} alt="logo" src={item.src} />}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={ava} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.description}
                            />
                            {item.content}
                            {/* <Modal 
                      title = 'Rate Me'
                      visible = {this.state.visible}
                      onClick={() => this.handleClick()}
                      onCancel = {() => this.setState({visible: false})}
                    ></Modal>  */}
                            <ModalForm
                                name={item.title}
                                cate={item.description}
                                business_id={item.bId}></ModalForm>
                        </List.Item>
                    )}
                />,
                mountNode
            </div>)
    };
};
export default Recommend;


// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import './Recom.css';
// import { List, Icon } from 'antd';
// import { Rate } from 'antd';
// import ModalForm from '../../component/ModalForm/ModalForm';
// import Axios from 'axios';

// class Recommend extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             visible: false,
//             userId: "test",
//             data:[]
//         }
//     }
//  handleClick = () => {
//         this.setState({
//             visible: true,
//         });
//     }
//     //request data and set state, userId?
//     requestRecom = async() => {
//         const recom = this.getRecom(this.state.userId)
//         .then(response => {
//             if (response) {
//                 this.setState({
//                     data: response.data
//                 })
//             }
//         })
//     }

//     //request data 
//     getRecom = (userId) => {
//         try {
//             return Axios.get("http://localhost:5000/recommend/" + userId)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     componentDidMount() {
//         this.requestRecom();
//     }
//     render() {
//         const datas = [
//             {
//                 href: '',
//                 title: `Bird On The Run`,
//                 src: require('../../assest/res1.jpg'),
//                 description: 'Chicken Shop',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 2
//             },
//             {
//                 href: '',
//                 title: `El Mecs`,
//                 src: require('../../assest/res9.jpg'),
//                 description: 'Mexican',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 3
//             },
//             {
//                 href: '',
//                 title: `Hidder Harbor`,
//                 src: require('../../assest/res2.jpg'),
//                 description: 'Hawaiian',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 4
//             },
//             {
//                 href: '',
//                 title: `Independent Brewing Company`,
//                 src: require('../../assest/res3.jpg'),
//                 description: 'Pubs',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 1
//             },
//             {
//                 href: '',
//                 title: `Aladdin Eatery`,
//                 src: require('../../assest/res4.jpg'),
//                 description: 'Middle Eastern',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 2
//             },
//             {
//                 href: '',
//                 title: 'Ramen Bar',
//                 src: require('../../assest/res5.jpg'),
//                 description: 'Ramen',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 3
//             },
//             {
//                 href: '',
//                 title: `Green Peppe`,
//                 src: require('../../assest/res6.jpg'),
//                 description: 'Korean',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 4
//             },
//             {
//                 href: '',
//                 title: `El Mecs`,
//                 src: require('../../assest/res7.jpg'),
//                 description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 2
//             },
//             {
//                 href: '',
//                 title: `El Mecs`,
//                 src: require('../../assest/res8.jpg'),
//                 description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//                 content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//                 rating: 1
//             },
//         ];

//         const listData = [];
//          datas.map((data) => {
//             listData.push({
//                 href: data.href,
//                 title: data.title,
//                 src: data.src,
//                 description: data.description,
//                 content: data.content,
//                 rating: data.rating
//             })      
//             }

//             //map data to listData
//             // this.state.data.map((data) => {
//             //     listData.push({
//             //         href: data.href,
//             //         title: data.title,
//             //         src: data.src,
//             //         description: data.description,
//             //         content: data.content,
//             //         rating: data.rating
//             //     })      
//             //     }
//         );

//         const IconText = ({ type, text }) => (
//             <span>
//                 <Icon type={type} style={{ marginRight: 8 }} />
//                 {text}
//             </span>
//         );
//         return (
//             <div>
//                 <List
//                     itemLayout="vertical"
//                     size="large"
//                     pagination={{
//                         onChange: (page) => {
//                             console.log(page);
//                         },
//                         pageSize: 8,
//                     }}
//                     dataSource={listData}
//                     footer={<div><b>ant design</b> footer part</div>}
//                     renderItem={item => (
//                         <List.Item
//                             key={item.title}
//                             // actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
//                             extra={<img width={272} alt="logo" src={item.src} />}
//                         >
//                             <List.Item.Meta
//                                 // avatar={<Avatar src={item.avatar} />}
//                                 title={<a href={item.href}>{item.title}</a>}
//                                 description={item.description}
//                             />
//                             {item.content}
//                             <div><Rate disabled defaultValue={item.rating} /></div>
//                             {/* <Modal 
//                       title = 'Rate Me'
//                       visible = {this.state.visible}
//                       onClick={() => this.handleClick()}
//                       onCancel = {() => this.setState({visible: false})}
//                     ></Modal>  */}
//                     <ModalForm></ModalForm>
//                         </List.Item>
//                     )}
//                 />,
//                 mountNode
//             </div>)
//     };
// };
// export default Recommend;

