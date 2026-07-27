import React from "react";
import { Tabs } from "react-native-collapsible-tab-view";

import { Recipe } from "../../../domain/entities/Recipe";
import { TopTabBar } from "../../../components/Themed";
import Layout from "../../../constants/Layout";
import { Screen } from "../ui/Screen";
import { RecipeDetailHeader } from "./RecipeDetailHeader";
import { IngredientList } from "./IngredientList";
import { DirectionList } from "./DirectionList";

const HEADER_HEIGHT = (Layout.window.height * 35) / 100;

export function RecipeDetailScreen({ recipe }: { recipe: Recipe }) {
    return (
        <Screen>
            <TopTabBar
                headerHeight={HEADER_HEIGHT}
                renderHeader={() => <RecipeDetailHeader recipe={recipe} height={HEADER_HEIGHT} />}
            >
                <Tabs.Tab name="Ingredients" label="Ingredients">
                    <Tabs.ScrollView>
                        <IngredientList ingredients={recipe.ingredients} />
                    </Tabs.ScrollView>
                </Tabs.Tab>
                <Tabs.Tab name="How to Cook" label="How to Cook">
                    <Tabs.ScrollView>
                        <DirectionList directions={recipe.directions} />
                    </Tabs.ScrollView>
                </Tabs.Tab>
            </TopTabBar>
        </Screen>
    );
}
