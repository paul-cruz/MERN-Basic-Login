import axios from 'axios';

export const registerUser = async (user) => {
    console.log(user);
    try {
        const res = await axios
            .post(`${process.env.REACT_APP_API}user/signup`, user, {
                headers: { 'Content-Type': 'application/json' }
            });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const loginUser = async (login) => {
    try {
        const res = await axios
            .post(`${process.env.REACT_APP_API}user/login`, login, {
                headers: { 'Content-Type': 'application/json' }
            });
        return res;
    } catch (error) {
        return error.response;
    }
}

export const forgotPassword = async (data) => {
    try {
        const res = await axios
            .post(`${process.env.REACT_APP_API}user/forgotPassword`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
        return res;
    } catch (error) {
        return error.response;
    }
}

export const resetPassword = async (token, user) => {
    try {
        const res = await axios
            .put(`${process.env.REACT_APP_API}user/resetPassword/${token}`, user, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
        return res;
    } catch (error) {
        return error.response;
    }
};