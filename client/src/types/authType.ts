export type SignUpType = {
    _id?: string
    userName: string
    phone: string
    password: string
    retypePassword: string
  };

  export type SignInType = {
    _id?: string
    phone: string
    password: string
  };

  export type AuthInfoType ={
    signInName: string
    admin:boolean
    isLoggedIn: boolean
    token?: string
    _id?: string
  }