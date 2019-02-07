import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Button, Modal, Form, Input, Radio, Icon
  } from 'antd';
import axios from 'axios';
import { Rate } from 'antd';
// import FormModal from '../FormModal/FormModal'

const FormItem = Form.Item;
// const FormItem = Form.Item;
// const Option = Select.Option;

class FormModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: 0,
            name: this.props.name,
            cate: this.props.cate,
            business_id: this.props.business_id,
            user_id:"Yimeng"
        }
    }
    handleChange = (value) => {
        this.setState({ value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {   
                const formSubmit = this.postForm(this.state.user_id, this.state.business_id, values.review, this.state.value)       
                console.log('Received values of form: ', values)
                // .then(() => this.setState(() => ({
                //     filled: true
                //   })));
            }
        });
    }

    postForm = (userId, bId, review, star) => {
        try {
            return axios.post('http://localhost:5000/write', {
                "user_id": userId,
                "stars": star,
                "text": review,
                "business_id": bId
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        // if (this.state.filled === true) {
        //     return <Redirect to='/Questionary' />
        // }
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const { value } = this.state

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Review"
                >
                    {getFieldDecorator('review', {
                        // rules: [{
                        //     type: 'email', message: 'The input is not valid E-mail!',
                        // }, {
                        //     required: true, message: 'Please input your E-mail!',
                        // }],
                    })(
                        <Input />
                    )}
                </FormItem>


                {/* <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem> */}
                <FormItem {...tailFormItemLayout}>
                <Rate onChange={this.handleChange} value={value} />
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit Review
                    </Button>
                </FormItem>
            </Form>
        )

    };
}
const WrappedFormModal = Form.create()(FormModal)
// export default withRouter(WrappedSignUp);
export default WrappedFormModal;
