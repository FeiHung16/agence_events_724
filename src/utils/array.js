

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

// Fonction filterByType pour filtrer un tableau d'objets par une propriété de type chaîne de caractères
export const filteredByType = ( data, type) => {
   try {
      console.log(type, data);
      return (data || [] ).filter((event) => !type || event.type === type); // si pas de type selectionné, on affiche tous les événements)

   }  catch (error) {
      console.error("Erreur du filtrage par type:", error);
      return []; // Retourne les données non filtrées en cas d'erreur
   }
}
 
// Méthode pour la pagination
 export const filterPagination = (data, currentPage, PER_PAGE) => {
   try {
      return (data || []).filter((_, index) => 
         index >= (currentPage - 1) * PER_PAGE && index < currentPage * PER_PAGE);

   } catch (error) {
      console.error("Erreur de la pagination:", error);
      return []; // Retourne les données non paginées en cas d'erreur
   }
}