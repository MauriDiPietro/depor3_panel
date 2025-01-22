import { StateCreator } from "zustand";
import { New } from "../../types/new.type";
import NewsService from "../../lib/services/news.service";

export interface NewsState {
  news: New[] | [];
  new: any;
  loadingNews: boolean;
  newsLoaded: boolean;
  errorNews: boolean;
  newCreated: boolean;
  newDeleted: boolean;
  errorCreateNew: boolean;
  errorDeleteNew: boolean;
}

export interface NewsActions {
  resetCargaDatosState: () => void;
  getAllNews: () => void;
  createNew: (body: New) => void;
  updateNew: (id: string, body: New) => void;
  createDraft: (body: New) => void;
  getNewById: (id: string) => void;
  deleteNewById: (id: string) => void;
}

export type NewsSlice = NewsState & NewsActions;

const initialState: NewsState = {
  news: [
    //     {
    //       title: "Los niños tendrán su Escuela Deportiva Recreativa de Verano",
    //       description: "",
    //       category: "Política deportiva",
    //       author: "Depor3",
    //       body: `Desde la Municipalidad de Río Tercero informaron que están abiertas las inscripciones para la Escuela Deportiva Recreativa de Verano para niños y niñas de 6 a 12 años de toda la ciudad.
    //           La iniciativa se llevará a cabo en la pileta del Club Atlético Río Tercero, con una primera etapa que irá del 6 al 24 de enero y para inscribirse es necesario ingresar al link: https://rio3.ar/Verano25PrimerEtapa`,
    //       image:
    //         "https://depor3.com/wp-content/uploads/2022/12/Verano-2-800x445.jpg",
    //       date: "17/12/2024",
    //       active: true,
    //     },
    //     {
    //       title: "Marcelo Ciarrocchi terminó séptimo en el campeonato de TC2000 ",
    //       description: "",
    //       category: "Automovilismo",
    //       author: "Depor3",
    //       body: `La ciudad entrerriana de Concordia, albergó este fin de semana, el “Gran Premio Coronación” de la 12ª fecha del 45⁰ Campeonato Argentino de TC200, donde el piloto almafuertense Marcelo Ciarrocchi logro meterse en el “top ten”, además de conseguir la “pole position” en la clasificación.
    //       El día sábado, con su Toyota Corolla fue el mejor de la clasificación y por única vez en el año, accedió a la posibilidad de largar en el primer lugar de la grilla en la carrera del día siguiente.
    //       En la primera final del domingo, pudo mantener el liderazgo hasta que sufrió un despiste en una curva tras tocarse con el auto de Franco Vivían. Igualmente, logró completar la carrera y finalizó en el 10º puesto.
    // En la segunda, Ciarrocchi largó 10º y pudo escalar hasta el 6º lugar en una carrera que ganó Matías Rossi, su compañero de equipo en el Toyota Gazoo Racing y subcampeón detrás de Leonel Pernía.
    // De esta manera, el piloto de Almafuerte culminó en el séptimo puesto del campeonato con 202 puntos, cerrando una temporada que incluyó una victoria en Concepción del Uruguay, ésta “pole position” en la última prueba y tres récords de vuelta.
    // `,
    //       image:
    //       "https://depor3.com/wp-content/uploads/2024/12/ciarrochi-1-800x445.jpg",
    //       date: "17/12/2024",
    //       active: true,
    //     },
    //     {
    //       title: "Con Assum y Reinaudi, Racing avanza en la Liga Argentina ",
    //       description: "",
    //       category: "Básquet",
    //       author: "Nicolás Cravero",
    //       body: `Tras una irregular primera fase, Racing de Chivilcoy, equipo que cuenta entre sus filas con dos riotercerenses, -Santiago Assum y Lucio Reinaudi-, avanzó a una nueva instancia de la Liga Argentina, segunda categoría del básquetbol nacional.
    //       Este fin de semana, los últimos subcampeones de la divisional, ganaron el cuadrangular de segunda ronda disputado en Lanus y accedieron a una ronda semifinal que se jugará con un formato similar entre el 20 y 22 de diciembre.
    // Aunque Assum fue goleador con 16 puntos, no pudo evitar la derrota de “La Academia” 50-71 ante Gimnasia de La Plata en el primer juego donde Reinuadi aportó un tanto. Luego llegó la victoria 68-55 ante Ciclista de Junín (Assum 8pt. y Reinaudi 3pt.) para vencer en el juego decisivo al local Lanus 68-65 y dejarlo afuera de competencia con otros 10 de “Santi” y 8 de Lucio.
    // En sede a confirmar mediante licitación, Racing jugará ahora otro cuadrangular con Quilmes de Mar del Plata, Villa Mitre de Bahía Blanca y Pico FC de General Pico, buscando el boleto a la instancia final de este Torneo Apertura.
    //       `,
    //       image: "https://depor3.com/wp-content/uploads/2024/12/racing-730x445.jpg",
    //       date: "16/12/2024",
    //       active: true,
    //     },
    //     {
    //       title: "LRRF: la primera final se celebró en Berrotarán",
    //       description: "",
    //       category: "Fútbol",
    //       author: "Depor3",
    //       body: `
    //       Jugando como local y de manera agónica, Belgrano FC de Berrotarán le dio vuelta el marcador a Deportivo Independiente, para ganar 2-1 la final de ida del Torneo Clausura de la Liga Regional Riotercerense de Fútbol (LRRF).
    //       Joaquín Cepeda puso en ventaja al “rojo” cuando corrían siete minutos del complemento, pero Jonathan Castro niveló a los 22 para el “celeste” que terminó ganando con gol de Carlos Passera en el minuto 50. Vale resaltar que todas las anotaciones llegaron por medio de cabezazos tras la ejecución de tiros de esquina.
    //       La revancha se disputará el próximo viernes desde las 21.45 en el estadio “Pura Molina” de Río Tercero.
    //       Por otra parte, la primera final de Reserva quedó para el vigente campeón, Sportivo 9 de Julio, que superó 2-1 a Estudiantes de Hernando como visitante.
    //       FOTO: Ibrahim Michref
    //       `,
    //       image:
    //       "https://depor3.com/wp-content/uploads/2024/12/belgrano-800x445.jpeg",
    //       date: "16/12/2024",
    //       active: true,
    //     },
    //     {
    //       title:
    //         "Llega una velada de reconocimiento para el deporte de Río Tercero con los premios Media Luna ",
    //       description: "",
    //       category: "Política deportiva",
    //       author: "Depor3",
    //       body: `Desde la Municipalidad de Río Tercero informaron que están abiertas las inscripciones para la Escuela Deportiva Recreativa de Verano para niños y niñas de 6 a 12 años de toda la ciudad.
    //           La iniciativa se llevará a cabo en la pileta del Club Atlético Río Tercero, con una primera etapa que irá del 6 al 24 de enero y para inscribirse es necesario ingresar al link: https://rio3.ar/Verano25PrimerEtapa`,
    //       image:
    //         "https://depor3.com/wp-content/uploads/2024/12/premios-1-800x445.jpg",
    //         date: "17/12/2024",
    //         active: true,
    //       },
    //       {
    //         title:
    //         "Nueve albergará un campus de la reconocida academia de Matías Gallo",
    //         description: "",
    //         category: "Básquet",
    //         author: "Depor3",
    //         body: `La ciudad entrerriana de Concordia, albergó este fin de semana, el “Gran Premio Coronación” de la 12ª fecha del 45⁰ Campeonato Argentino de TC200, donde el piloto almafuertense Marcelo Ciarrocchi logro meterse en el “top ten”, además de conseguir la “pole position” en la clasificación.
    //         El día sábado, con su Toyota Corolla fue el mejor de la clasificación y por única vez en el año, accedió a la posibilidad de largar en el primer lugar de la grilla en la carrera del día siguiente.
    // En la primera final del domingo, pudo mantener el liderazgo hasta que sufrió un despiste en una curva tras tocarse con el auto de Franco Vivían. Igualmente, logró completar la carrera y finalizó en el 10º puesto.
    // En la segunda, Ciarrocchi largó 10º y pudo escalar hasta el 6º lugar en una carrera que ganó Matías Rossi, su compañero de equipo en el Toyota Gazoo Racing y subcampeón detrás de Leonel Pernía.
    // De esta manera, el piloto de Almafuerte culminó en el séptimo puesto del campeonato con 202 puntos, cerrando una temporada que incluyó una victoria en Concepción del Uruguay, ésta “pole position” en la última prueba y tres récords de vuelta.
    // `,
    // image: "https://depor3.com/wp-content/uploads/2024/12/gallo.jpeg",
    // date: "13/12/2024",
    // active: true,
    // },
  ],
  new: null,
  loadingNews: false,
  newsLoaded: false,
  newDeleted: false,
  errorNews: false,
  errorDeleteNew: false,
  newCreated: false,
  errorCreateNew: false,
};

export const createNewsSlice: StateCreator<NewsSlice> = (set) => ({
  ...initialState,
  resetCargaDatosState: () => set({ ...initialState }),
  getAllNews: async () => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.getAllNews();
      if (!response) throw new Error("No se encontraron las noticias");
      set({ news: response.data, newsLoaded: true });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  getNewById: async (id: string) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.getNewById(id);
      if (!response) throw new Error("No se encontraron las noticias");
      set({ new: response.data, newsLoaded: true });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  deleteNewById: async (id: string) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.deleteNewById(id);
      if (!response) throw new Error("No se encontraron las noticias");
      set({ newDeleted: true });
    } catch (error) {
      set({ errorNews: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  createNew: async (body: New) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.createNew(body);
      if (!response) throw new Error("Error al registrar noticia");
      set({ newCreated: true });
    } catch (error) {
      set({ errorDeleteNew: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  updateNew: async (id: string, body: New) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.updateNew(id, body);
      if (!response) throw new Error("Error al registrar noticia");
      set({ newCreated: true });
    } catch (error) {
      set({ errorCreateNew: true });
    } finally {
      set({ loadingNews: false });
    }
  },
  createDraft: async (body: New) => {
    set({ loadingNews: true });
    try {
      const response = await NewsService.createDraft(body);
      if (!response) throw new Error("Error al registrar noticia");
      set({ newCreated: true });
    } catch (error) {
      set({ errorCreateNew: true });
    } finally {
      set({ loadingNews: false });
    }
  },
});
