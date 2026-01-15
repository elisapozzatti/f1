export const fetchAllOrCurrentDrivers = async (url: RequestInfo | URL) => {
  try {
    const res = await fetch(url);
    const drivers = await res.json();
    return drivers.map(
      (driver: {
        image: String;
        first_name: String;
        last_name: String;
        birth_date: Date;
        team: String;
        career_poles: Number;
        career_podiums: Number;
        career_wins: Number;
        debut_f1: Number;
        world_titles: Number;
        last_season: String;
      }) => ({
        immagine: driver.image,
        nome: driver.first_name,
        cognome: driver.last_name,
        data_nascita: new Date(driver.birth_date).toLocaleDateString("it-IT"),
        scuderia: driver.team,
        pole_positions: driver.career_poles,
        podi: driver.career_podiums,
        vittorie: driver.career_wins,
        debutto: driver.debut_f1,
        titoli: driver.world_titles,
        ultima_stagione: driver.last_season,
      })
    );
  } catch (error) {
    console.error("Errore nel caricamento dei piloti:", error);
    return [];
  }
};

export const fetchNameTeams = async (url: RequestInfo | URL) => {
  try {
    const res = await fetch(url);
    const teams = await res.json();
    return teams.map((teams: { name: String }) => ({
      name: teams.name,
    }));
  } catch (error) {
    console.error("Errore nel caricamento delle scuderie:", error);
    return [];
  }
};
