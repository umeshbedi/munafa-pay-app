import { NavigationProp, RouteProp } from "@react-navigation/native";

export type ScreenList = {
  Home: undefined;
  SendToBank: {balance:number, uid?:string};
  SendToUpi:{balance:number, uid?:string, upi:string};
  Login: undefined;
  Register: undefined;
  PaymentMethod: { session?: string, mode?:string, data?:any },
  DoPayment:{url?:string, callbackUrl?:string, data?:any}
  Expenses:{data?:any},
  QRScannerScreen:{balance:number, uid:string};
  Drawer:undefined;
  Profile:undefined;
}

