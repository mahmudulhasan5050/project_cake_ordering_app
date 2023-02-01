import { Dayjs } from 'dayjs';
import { CakeType } from './cakeType';
import { UserType } from './userType';

export type OrderSubmitType = {
    _id?: string
    userId: string | undefined
    cakeId: string | undefined
    amount: number
    totalPrice: number
    deliveryDate: string | undefined
};

export type OrdersType = {
    _id?: string
    userId: UserType
    cakeId: CakeType | undefined
    amount: number
    totalPrice: number
    deliveryDate: string
    deliveryStatus: boolean
}