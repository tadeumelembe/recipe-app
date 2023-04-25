import { NavigationProp } from "@react-navigation/native";

export interface IHead {
    navigation:  NavigationProp<any, any>,
}

export interface IUserContext {
    id: string,
    name: string,
    email: string,
}

export interface IHomeFeedCard{
    navigation: NavigationProp<any, any>,
    item: any
}