import axios from "axios";

const getCleanApiUrl = () => {
    let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    return baseUrl.replace(/\/+$/, '');
};

const getFullUrl = (path) => {
    const base = getCleanApiUrl();
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${cleanPath}`;
};

const getAuthHeaders = (contentType = 'application/json') => {
    const headers = { 'Content-Type': contentType };
    const token = localStorage.getItem('accessToken');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const postData = async (url, formData) => {
    try {
        const response = await fetch(getFullUrl(url), {
            method: 'POST',
            credentials: 'include',
            headers: getAuthHeaders('application/json'),
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export const fetchDataFromApi = async (url) => {
    try {
        const params = {
            headers: getAuthHeaders('application/json'),
            withCredentials: true
        } 

        const { data } = await axios.get(getFullUrl(url), params)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const uploadImage = async (url, updatedData ) => {
    const params = {
        headers: getAuthHeaders('multipart/form-data'),
        withCredentials: true
    } 

    var response;
    await axios.put(getFullUrl(url), updatedData, params).then((res)=>{
        response = res;
    })
    return response;
}

export const uploadImages = async (url, formData ) => {
    const params = {
        headers: getAuthHeaders('multipart/form-data'),
        withCredentials: true
    } 

    var response;
    await axios.post(getFullUrl(url), formData, params).then((res)=>{
        response = res;
    })
    return response;
}

export const editData = async (url, updatedData ) => {
    const params = {
        headers: getAuthHeaders('application/json'),
        withCredentials: true
    } 

    var response;
    await axios.put(getFullUrl(url), updatedData, params).then((res)=>{
        response = res;
    })
    return response;
}

export const deleteImages = async (url, image ) => {
    const params = {
        headers: getAuthHeaders('application/json'),
        withCredentials: true,
        data: { image }
    } 
    const { res } = await axios.delete(getFullUrl(url), params);
    return res;
}

export const deleteData = async (url ) => {
    const params = {
        headers: getAuthHeaders('application/json'),
        withCredentials: true
    } 
    const { res } = await axios.delete(getFullUrl(url), params)
    return res;
}

export const deleteMultipleData = async (url, data ) => {
    const params = {
        headers: getAuthHeaders('application/json'),
        withCredentials: true,
        data: data
    } 
    const { res } = await axios.delete(getFullUrl(url), params)
    return res;
}