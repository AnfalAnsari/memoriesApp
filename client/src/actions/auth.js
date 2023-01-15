import * as api from '../api/index'
import { AUTH } from '../constants/actionType';

export const signIn = (user, history) => async (dispatch) => {

    try {

        const { data } = await api.signIn(user);

        dispatch({ type: AUTH, payload: { result: data.result, token: data.token } })

        history.push('/');


    } catch (error) {
        console.log(error);
    }

}

export const signUp = (user, history) => async (dispatch) => {

    try {

        const { data } = await api.signUp(user);

        dispatch({ type: AUTH, payload: { result: data.result, token: data.token } })

        history.push('/');


    } catch (error) {
        console.log(error);
    }

}