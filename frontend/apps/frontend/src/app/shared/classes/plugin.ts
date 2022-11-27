export class Plugin {
  constructor(
    // name of plugin - example: "Religion_abmelden"
    public name: string | null,

    // teachers of plugin - example for Religion_abmelden: ["Mairinger", "Mörixbauer"]
    public teachers: string[],

    // additional description of plugin - example for Religion_abmelden: "Religionsabmeldung der Schüler in der ersten Schulwoche"
    public description: string | null,

    // tags for this plugin - example for Religion_abmelden: ["Erste Schulwoche", "Religion"]
    public tags: string[] | null,

    // startDate for plugin - example for Religion_abmelden: "1662789600" (Datum des ersten Schultags als UnixTimeStamp mit Sekunden)
    public startDate: string | null,

    // endDate for plugin - example for Religion_abmelden: "1663221600" (Datum des ersten Freitags im Schuljahr als UnixTimeStamp mit Sekunden)
    public endDate: string | null,

    // imageLink for plugin - emaple for Religion_abmelden: https://www.soulsaver.de/wp-content/uploads/2022/05/Soulsaver-Bildgroesse-26.jpg
    public image: string | null,

    // whether the user added this course to their favourites
    public isFavourite: boolean = false,
  ) {
  }
}
