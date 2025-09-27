

// Fonction sortDescending pour trier un tableau d'objets par une propriété numérique en ordre décroissant
export const sortDescending = (data = []) => {
   try {
        const sortedData = [...data].sort((eventA, eventB) => new Date(eventB.date) - new Date(eventA.date)); // Tri décroissant
        return sortedData;
   } catch (error) {
      console.error("Erreur du tri décroissant:", error);
      return []; // Retourne les données non triées en cas d'erreur
   }
};