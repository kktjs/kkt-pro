import { createModel } from '@rematch/core';
const demo = createModel()({
  name: 'demo1',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    isView: false,
  },
  reducers: {
    updateState: (state: any, payload: any) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch) => ({}),
});
export default demo;
