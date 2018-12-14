import { axios } from '@http';
import _ from 'lodash';

export const getRulesList = () => {
  return axios.get('/rules');
};

export const saveRules = (formValue) => {
  const formBody = {};
  let ruleName = '';

  // 拼装符合 API 规定的数据格式
  _.forIn(formValue, (val, key) => {
    if (key.search('Keys') === -1) {
      if (_.isString(val)) {
        ruleName = val;
      } else if (_.isArray(val)) {
        // Antd 表单的数据如果是多个同字段的值，那么该字段表现是数组，如果该字段没有数据，那么值是 undefined
        if (val.length > 0 && val[0] !== undefined) {
          formBody[key] = val;
        }
      }
    }
  });

  return axios.put(`/rules/${ruleName}`, formBody);
};
