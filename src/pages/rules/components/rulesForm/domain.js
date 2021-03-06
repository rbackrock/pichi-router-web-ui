import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Icon, Button } from "antd";
import { actionCreator } from '../../store';
import { bindActionCreators } from "redux";
import uuid from 'uuid/v1';

const FormItem = Form.Item;

class DomainFormItem extends PureComponent {
  render() {
    const { formItemCommonLayout, formItemLayoutWithOutLabel } = this.props;
    const keysName = 'domainKeys',
      fieldName = 'domain';
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator(keysName, { initialValue: ['initDomain'] });
    const keysValue = getFieldValue(keysName);

    return (
      <Fragment>
        {
          keysValue.map((k, index) => (
            <FormItem
              {...(index === 0 ? formItemCommonLayout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Domain' : ''}
              key={k}
            >
              {
                getFieldDecorator(`${fieldName}[${index}]`, {
                  rules: index === 0 ? [] : [{ required: true, whitespace: true, message: "Please input domain's name or delete this field." }]
                })(<Input placeholder="Please input domain." style={{ width: '80%', marginRight: 8 }}/>)
              }
              {keysValue.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={keysValue.length === 1}
                  onClick={() => this.handleRemoveItem(keysName, fieldName, index)}
                />
              ) : null}
            </FormItem>
          ))
        }
        <FormItem
          {...formItemLayoutWithOutLabel}
        >
          <Button type="dashed" onClick={() => this.handleAddItem(keysName)} style={{ width: '80%' }}>
            <Icon type="plus" /> Add domain
          </Button>
        </FormItem>
      </Fragment>
    )
  }

  handleRemoveItem(keysName, fieldName, removeIndex) {
    const { form } = this.props;
    const keys = form.getFieldValue(keysName);
    const fieldValue = form.getFieldValue(fieldName);

    if (keys.length > 1) {
      form.setFieldsValue({
        [`${keysName}`]: keys.filter((key, index) => index !== removeIndex),
        [`${fieldName}`]: fieldValue.filter((item, index) => index !== removeIndex)
      });
    }
  }

  handleAddItem(keysName) {
    const { form } = this.props;
    const keys = form.getFieldValue(keysName);

    form.setFieldsValue({
      [keysName]: keys.concat(uuid())
    });
  }
}

const stateMapToProps = (state) => {
  return {

  };
};

const dispatchMapToProps = (dispatch) => {
  return {
    actions: bindActionCreators({...actionCreator}, dispatch)
  };
};

export default connect(stateMapToProps, dispatchMapToProps)(DomainFormItem);
