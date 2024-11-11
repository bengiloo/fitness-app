export const exerciseOptions =  {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const youtubeOptions =  {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPID_API_KEY_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
};

export const fetchData = async(url, options) => {
    let response = await fetch(url, options);
    let data = await response.json();
    return data;
}