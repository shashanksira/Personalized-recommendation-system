import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './signUp.css';
import Questionary from '../Questionary/Questionary';
import { BrowserRouter as Router, Route, Redirect, Link, withRouter } from "react-router-dom";
import axios from 'axios';

// import Input from '../../component/input/Input';
import 'antd/dist/antd.css';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        // filled: false
    };

    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFieldsAndScroll((err, values) => {
    //         if (!err) {
    //             console.log('Received values of form: ', values)
    //             // .then(() => this.setState(() => ({
    //             //     filled: true
    //             //   })));
    //         }
    //     });
    // }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.handleFormSubmit(values)) {
                    console.log(values);
                    this.props.history.push('/question');
                }
            }
        });
    }

    handleFormSubmit = async (values) => {
        // console.log('Received values of form: ', values)
        try {
            return axios.post('http://localhost:5000/register', {
                "name": values.email,
                // stars: value,
                // text: "",
                "select-multiple": values.selectMultiple,

            })
        } catch (error) {
            console.log(error)
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    render() {
        // if (this.state.filled === true) {
        //     return <Redirect to='/Questionary' />
        // }
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

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


        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Name"
                >
                    {getFieldDecorator('email', {
                        // rules: [{
                        //     type: 'email', message: 'The input is not valid E-mail!',
                        // }, {
                        //     required: true, message: 'Please input your E-mail!',
                        // }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Confirm Password"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Where Do You Eat"
                    hasFeedback
                >
                    {getFieldDecorator('select', {
                        rules: [
                            { required: true, message: 'Please select your primary dinning location' },
                        ],
                    })(
                        <Select placeholder="Please select your primary dinning location">
                            <Option value="Pittsburgh">Pittsburgh</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="What Do you Like"
                >
                    {getFieldDecorator('selectMultiple', {
                        rules: [
                            { required: true, message: 'Tell Us Your Fav Food!', type: 'array' },
                        ],
                    })(
                        <Select mode="multiple" placeholder="What do you like?">
                            <Option value="Pizza">Pizza</Option>
                            <Option value="American(Traditional)">American(Traditional)</Option>
                            {/* <Option value="Coffee & Tea">Coffee & Tea</Option> */}
                            <Option value="Burgers">Burgers</Option>
                            <Option value="Chinese">Chinese</Option>
                            {/* <Option value="Breakfast & Brunch">Breakfast & Brunch</Option> */}
                            <Option value="Sandwiches">Sandwiche</Option>
                            <Option value="Nightlife">Nightlife</Option>
                            <Option value="Korean">Korean</Option>
                            <Option value="Japanese">Japanese</Option>
                            <Option value="Vietnamese">Vietnamese</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        {/* <Link to="/question">About</Link> */}
                        Next
                    </Button>
                </FormItem>
            </Form>
        )

    };
}
const WrappedSignUp = Form.create()(RegistrationForm)
export default withRouter(WrappedSignUp);
