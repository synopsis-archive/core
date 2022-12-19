export interface Plugin {
    id: string;
    name: string;
    description: string | null;
    teachers: string[];
    tags: string[] | null;
    startDate: string | null;
    endDate: string | null;
    image: string | null;
    isFavourite: boolean;
}
