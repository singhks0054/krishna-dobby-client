import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../redux/store';

// export interface loginState {
//   isLogin: Boolean;
//   newUser: Boolean;
//   showImgModal: Boolean;
//   token: String | null;
//   name: String | null;
// }

const initialState = {
  name: '',
  isLogin: false,
  newUser: false,
  token: null,
  showImgModal: false,
  userImage: [],
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    //@ts-ignore
    login: (
      state: { isLogin: boolean; token: String; name: String },
      action: PayloadAction<[String]>
    ) => {
      state.isLogin = true;
      state.token = action.payload[0];
      //@ts-ignore
      state.name = action.payload[1];
      //@ts-ignore
      console.log(action.payload[2]);
      //@ts-ignore
      state.userImage = action.payload[2];
    },
    setShowImgModal: (state) => {
      state.showImgModal = !state.showImgModal;
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = null;
    },
    signup: (state) => {
      state.newUser = !state.newUser;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, signup, setShowImgModal } = loginSlice.actions;

export const isLoginSelector = (state: RootState) => state.isLogin.isLogin;
export const newUserSelector = (state: RootState) => state.isLogin.newUser;
export const tokenSelector = (state: RootState) => state.isLogin.token;
export const userImageSelector = (state: RootState) => state.isLogin.userImage;
export const nameSelector = (state: RootState) => state.isLogin.name;
export const imgModalSelector = (state: RootState) =>
  state.isLogin.showImgModal;

export default loginSlice.reducer;
