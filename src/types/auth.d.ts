export interface ILogin {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IVerifyForgotPasswordOTP {
  otp: string;
}

export interface IResetPassword {
  newPassword: string;
  confirmPassword?: string;
}

export interface IRegister {
  countryFlag: string;
  countryCode: string;
  phoneNumber: string;
  email?: string | null;
  agreeToTerms?: boolean;
}

export interface SuccessScreenProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  redirectTo: string;
}
