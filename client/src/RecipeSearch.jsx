import {useState, useEffect} from 'react'
import Searchbar from './components/Searchbar'
import Loading from './components/Loading'
import RecipeCard from './components/RecipeCard'
import { fetchRecipes } from './utils/index'
import Button from './components/Button'
import { Search } from "lucide-react";

const RecipeSearch = () => {
    const [recipes, setRecipes] = useState([])
    const [query, setQuery] = useState('Vegan')
    const [limit, setLimit] = useState(30)
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {

        setQuery(e.target.value)
    }

    const fetchRecipe = async () => {
        try {
            const data = await fetchRecipes({ query, limit })
            setRecipes(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSearchedRecipe = async (e) => {
        e.preventDefault()
        fetchRecipe()
    }

    const showMore = () => {
        setLimit(prev => prev + 10)
        fetchRecipe()
    }

    useEffect(() => {
        setLoading(true)
        fetchRecipe()

    }, [])

    if (loading) {
        return (
            <Loading />
        )
    }
  return (
    <div className="w-full">  
        <div className="h-screen flex flex-col items-center justify-center pt-10 pb-5 px-0 md:px-10">
            <form className='w-full lg:w-2/4' onSubmit={handleSearchedRecipe}>
                <Searchbar 
                    placeholder="Search for any recipes here!">
                    handleInputChange={handleChange}
                    rightIcon={
                        <Search className='text-gray-600' />
                    }
                </Searchbar>
            </form>
            {
                recipes?.length > 0 ? (
                    <>
                        <div className='w-full flex flex-wrap gap-10 px-0 lg:px-10 py-10'>
                            {
                                recipes?.map((item, index) => (
                                    <RecipeCard recipe={item} key={index} />))
                            }
                        </div>

                        <div className='flex w-full items-center justify-center py-10'>

                            <Button
                                title="Show More"
                                containerStyle="bg-green-800 text-white px-3 py-1 rounded-full text-sm"
                                handleClick={showMore}
                            />
                        </div>
                    </>
                ) : <div className='text-white w-full items-center justify-center py-10'>
                    <p className='text-center'>No Recipe Found</p>
                </div>
            }
        </div>     
    </div>
  )
}

export default RecipeSearch
