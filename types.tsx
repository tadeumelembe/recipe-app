/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IRecipeItem } from './src/components/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  RecipeDetails: {
    navigation: NavigationProp<any, any>;
    recipe_id: number
  };
  CookingMode: {
    navigation: NavigationProp<any, any>;
    item: IRecipeItem
  };
};


export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;


export type ProfileStackParamList = {
  Root: {
    navigation: NavigationProp<any, any>;
  },
  AddRecipe: undefined | {
    navigation: NavigationProp<any, any>;
  },
  Settings: {
    navigation: NavigationProp<any, any>;
  },
  ChangePassword: {
    navigation: NavigationProp<any, any>;
  },
};
export type ProfileStackScreenProps<Screen extends keyof ProfileStackParamList> = NativeStackScreenProps<
  ProfileStackParamList,
  Screen
>;


export type RootTabParamList = {
  TabSearch: undefined;
  TabProfile: {
    navigation: NavigationProp<any, any>
  };
  TabHome: {
    navigation: NavigationProp<any, any>
  };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
