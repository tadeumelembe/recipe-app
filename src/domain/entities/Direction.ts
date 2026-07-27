export interface Direction {
    id: string; // stable id — never index-based
    position: number; // 1-based, contiguous
    instruction: string;
    imageUrl: string | null;
}
