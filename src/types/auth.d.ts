export interface ILogin {
  email: string;
  password: string;
}

export interface IForgotPassword {
  countryFlag: string;
  countryCode: string;
  phoneNumber: string;
}

export interface IVerifyForgotPasswordOTP {
  countryFlag: string;
  countryCode: string;
  phoneNumber: string;
  otp: string;
}

export interface IResetPassword {
  newPassword: string;
  userId?: string;
  confirmPassword?: string;
}

export interface ISendOTP {
  countryFlag: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
}

export interface IVerifyOTP {
  countryFlag?: string;
  countryCode?: string;
  phoneNumber?: string;
  otp: string;
}

export interface IRegister {
  countryFlag: string;
  countryCode: string;
  phoneNumber: string;
  email?: string | null;
  agreeToTerms?: boolean;
}

export interface IProfileSetup {
  profileImage?: File | null;
  name: string;
  age: string;
  gender: string;
  height?: string | null;
  weight?: string | null;
  flatNo: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  landmark: string;
  cityId: string;
  stateId: string;
}

export interface ISignUp extends IProfileSetup {
  password: string;
  confirmPassword: string;
  isGoogle: boolean;
  googleId?: string;
  isApple: boolean;
  appleId?: string;
  email: string;
  countryFlag: string;
  countryCode: string;
  phoneNumber: string;
  id?: string;
}

export interface IIsRegister {
  email: string;
  name: string;
  isSocialType: "isGoogle" | "isApple";
  isApple: boolean;
  appleId?: string;
  isGoogle: boolean;
  googleId?: string;
}

export interface ISocialLoginButton {
  icon: string;
  label: string;
  onClick: () => void;
  disabled: boolean;
}

export interface IAuthTitleBox {
  title: string;
  description?: string;
  className?: string;
}

export interface IProfile {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  countryFlag: string;
  countryCode: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  flatNo: string;
  address: string;
  landmark: string;
  profileImage: string;
  role: string;
  city: string;
  state: string;
  cityId: ICity;
  stateId: string;
}

export interface IAddFamilyMember {
  name: string;
  age: string;
  gender: string;
  height?: string;
  weight?: string;
  flatNo: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  landmark: string;
  cityId: string;
  stateId: string;
  _id?: string;
}

export interface IMemberBox {
  index: number;
  member: IAddFamilyMember;
  // handleEditMember: (index: number) => void;
  // handleDeleteMember: (index: number) => void;
}

export interface DeleteMemberModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface IState {
  _id: string;
  name: string;
}

export interface ICity {
  _id: string;
  name: string;
  stateId: IState;
}
