export interface IHead {
    type?: string | null | undefined;
}

export interface IUserContext {
    id: string,
    name: string | null,
    email: string | null,
}

export interface IHomeFeedCard {
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


export interface IRecipeItem {
    name: string;
    image: string;
    id: number;
}

/* ---------------------------- */
/* Begin Profile Types **/
export interface IProfileHeader {
    headerHeight: number;
}

export interface IProfileRecipeItem {
    item: {
        title: string;
        image: string;
        id: number;
    };
}
/*End Profile Types **/



/** Add/edit recipes*/
export interface IRecipeForm {
    coverImage: object;
    galleryImages: Array<object>;
    video:string,
    ingredients:Array<string>;
}
/** End */

export interface IModalRef {
    close: () => void;
    open: () => void;
}
