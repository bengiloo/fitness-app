import {useState, useEffect, useRef} from 'react'
import RecipeGeneratorForm from './components/RecipeGeneratorForm';
const RecipeGenerator = () => {
    const [recipeData, setRecipeData] = useState(null);
    const [recipeText, setRecipeText] = useState("");
  
    let eventSourceRef = useRef(null);
  
    useEffect(() => {
      closeEventStream(); // Close any existing connection
    }, []);
  
    useEffect(() => {
      if (recipeData) {
        closeEventStream(); // Close any existing connection
        initializeEventStream(); // Open a new connection
      }
    }, [recipeData]);
  
    // Function to initialize the event stream
    const initializeEventStream = () => {
      const recipeInputs = {... recipeData };
      // Construct query parameters
      const queryParams = new URLSearchParams(recipeInputs).toString();
      // Open an SSE connection with these query parameters
      const url = `http://localhost:3000/recipeStream?${queryParams}`;
      eventSourceRef.current = new EventSource(url);
      
      eventSourceRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
  
        if (data.action === "close") {
          closeEventStream();
        } else if (data.action === "chunk") {
          setRecipeText((prev) => prev + data.chunk);
        }
      };
  
      eventSourceRef.current.onerror = () => {
        eventSourceRef.current.close();
      };
    };
  
    // Function to close the event stream
    const closeEventStream = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  
    async function onSubmit(data) {
      // update state
      setRecipeText('')
      setRecipeData(data);
    }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-[#01030f] to-[#001f3f]">
        <div className="flex space-x-8">
            {/* Recipe Generator Form */}
            <div className="w-[400px] border rounded-lg overflow-hidden shadow-lg">
            <RecipeGeneratorForm onSubmit={onSubmit} />
            </div>

            {/* Recipe Text Box */}
            <div className="w-[400px] h-[565px] text-xs text-white p-4 border rounded-lg shadow-xl whitespace-pre-line overflow-y-auto">
              {recipeText}
            </div>
        </div>
    </div>
  )
}

export default RecipeGenerator
