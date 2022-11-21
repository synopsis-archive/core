export class DetailedCourse {
  constructor(
    public name: string | null,
    public teachers: string[],
    public description: string | null,
    public categoryName: string | null,
    public startDate: string | null,
    public endDate: string | null,
    public isFavourite: boolean = false,
  ) {
  }
}
