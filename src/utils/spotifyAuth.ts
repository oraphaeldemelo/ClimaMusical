import qs from 'qs';
import axios from 'axios';


export const getAuth = async () => {
    const clientId: any = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret:any = process.env.SPOTIFY_CLIENT_SECRET;
    const auth_token = Buffer.from(`${clientId}:${clientSecret}`, 'utf-8').toString('base64');

    try{
        const token_url = 'https://accounts.spotify.com/api/token';
        const data = qs.stringify({'grant_type':'client_credentials'});

        const response = await axios.post(token_url, data, {
            headers: { 
            'Authorization': `Basic ${auth_token}`,
            'Content-Type': 'application/x-www-form-urlencoded' 
            }
        })
        //return access token
        return response.data.access_token;
    }catch(error){
        throw error
    }
}