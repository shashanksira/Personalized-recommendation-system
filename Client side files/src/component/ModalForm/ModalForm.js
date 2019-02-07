import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './ModalForm.css';
import {
    Button, Modal, Form, Input, Radio, Icon
  } from 'antd';
import axios from 'axios';
import { Rate } from 'antd';
import FormModal from '../FormModal/FormModal'

const FormItem = Form.Item;


class ModalForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      name: this.props.name,
      cate: this.props.cate,
      business_id: this.props.business_id
    }
}
      showModal = () => {
        this.setState({ visible: true });
      }
    
      handleCancel = () => {
        this.setState({ visible: false });
      }

    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
    
      render() {
        const { name, cate, business_id } = this.state
        // console.log(this.state)
        // console.log(name)
        // console.log(cate)
        return (
          <div>
            <Button type="primary" onClick={this.showModal}>Rate Me</Button>
            {/* <FormModal
              visible={this.state.visible}
              onCancel={this.handleCancel}
              name = {name}
              cate = {cate}
              business_id = {business_id}

            /> */}
            <Modal
            visible={this.state.visible}
            onCancel={this.handleCancel}>
            <FormModal
              // visible={this.state.visible}
              // onCancel={this.handleCancel}
              name = {name}
              cate = {cate}
              business_id = {business_id}

            />
            </Modal>
          </div>
        );
      }
}
export default ModalForm;