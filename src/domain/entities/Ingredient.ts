export interface Ingredient {
    id: string; // stable id — never index-based
    name: string;
    quantity: string | null;
}
