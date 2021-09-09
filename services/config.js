import axios from 'axios';

export async function getPaises(value = 'all') {
    return await axios.get(`https://restcountries.eu/rest/v2/${value}`);
}