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


export interface IAuthPage {
    navigation: NavigationProp<any, any>,
}

export interface IRecipeItem {
    name: string;
    image: string;
    id: number;
}

/* ---------------------------- */
/* Begin Profile Types **/
export interface IProfileHeader {
    navigation: NavigationProp<any, any>;
    headerHeight: number;
}

export interface IRecipeTab {
    navigation: NavigationProp<any, any>,
}

export interface IProfileRecipeItem {
    item: {
        title: string;
        image: string;
        id: number;
    };
    navigation: NavigationProp<any, any>;
}
/*End Profile Types **/


/* ---------------------------- */
/* Begin Settings Types **/

/*End Settings Types **/

