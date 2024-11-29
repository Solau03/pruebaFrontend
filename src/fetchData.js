const fetchData = async (path) => {
    try {
      const response = await fetch(path); // Carga los datos desde la ruta proporcionada
      if (!response.ok) {
        throw new Error(`Error al cargar los datos desde: ${path}`);
      }
      const data = await response.json(); // Convierte la respuesta en JSON
      return data; 
    } catch (error) { 
      console.error("Error:", error.message); 
      return null; //
    }
  };
  export default fetchData;