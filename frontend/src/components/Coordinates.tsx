export const fetchCircuits = async (url: RequestInfo | URL) => {
  try {
    const res = await fetch(url);
    const circuits = await res.json();
    return circuits.map(
      (circuits: {
        name: String;
        coords: [Number, Number];
        country: String;
        years_active: Number;
        length_km: Number;
        turns: Number;
        active: Boolean;
      }) => ({
        name: circuits.name,
        coords: circuits.coords,
        country: circuits.country,
        years_active: circuits.years_active,
        length_km: circuits.length_km,
        turns: circuits.turns,
        active: circuits.active,
      }),
    );
  } catch (error) {
    console.error("Errore nel caricamento dei circuiti:", error);
    return [];
  }
};
