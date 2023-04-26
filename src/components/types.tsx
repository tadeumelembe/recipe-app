import { NavigationProp } from "@react-navigation/native";

export interface IHead {
    navigation: NavigationProp<any, any>,
}

export interface IUserContext {
    id: string,
    name: string,
    email: string,
}

export interface IHomeFeedCard {
    navigation: NavigationProp<any, any>,
    item: IHomeItem
}

export interface IHomeItem {
    id: string,
    profile_name: string,
    created_at: string,
    image: string | null,
    title: string,
    description: string | null
}