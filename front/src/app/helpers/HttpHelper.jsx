import { GetApi } from "../Enviroment"
import { User } from "../models/User";
import axios from 'axios'

const headersJson = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
  //'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  Authorization: ''
}

const headers = {
  'X-Requested-With': 'XMLHttpRequest',
  //'Content-Type': 'application/json',
 // 'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  Authorization: "",
};

const headersFile = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'multipart/form-data',
  //'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
  Authorization: ''
}

export const ResponseStatus = {
  Ok: 200,
  Created: 201,
  BadRequest: 400
}

export function GetResponse(route = '', params)
{
    let url = GetApi() + route;
    if (params)
    {        
        const dados = new URLSearchParams(params);
        url += '?' + dados.toString();
    }

    let header = headers;    
    const user = User.Get();
    if (user)
        header['Authorization'] = user.Token;

    return axios.get(url, { headers: header });
}

export function PostResponse(route = '', params)
{
    let url = GetApi() + route;
    const jsonData = JSON.stringify(params);

    let header = headersJson;    
    const user = User.Get();
    if (user)
        header['Authorization'] = user.Token;

    return axios.post(url, jsonData, { headers: header });
}

export function DeleteResponse(route = '', params)
{
    let url = GetApi() + route;
    const jsonData = JSON.stringify(params);

    let header = headersJson;    
    const user = User.Get();
    if (user)
        header['Authorization'] = user.Token;

    return axios.delete(url, { headers: header, data: params });
}

export function PostUploadResponse(route = '', params)
{
    let url = GetApi() + route;

    let header = headersFile;    
    const user = User.Get();
    if (user)
        header['Authorization'] = user.Token;

    return axios.post(url, params, { headers: header });
}