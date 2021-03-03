import axios from 'axios'

export const ApiClient = {
    async getBanks(){

        let response = await axios.get('https://api.jsonbin.io/b/5ea2fa3e98b3d5375233ca89').then( resp => resp.data);
        return response;
    }  
}