import axios from 'axios'

export const ApiClient = {
    async getBanks(){

        let response = await axios.get('https://api.jsonbin.io/b/604006e581087a6a8b95b784').then( resp => resp.data);
        return response;
    }  
}