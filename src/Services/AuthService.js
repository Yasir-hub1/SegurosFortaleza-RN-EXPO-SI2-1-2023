import axios from "../Util/Axios";
import { Platform } from "react-native";
import { setItemAsync, deleteItemAsync } from "expo-secure-store";
import { USER_TOKEN_KEY, USER_KEY } from "../Providers/AuthProvider";

import errorHandler from "../Util/AxiosErrorHandler";

/* FUNCION PARA INICIAR SESION CON DATOS DE LA API */
export async function login(data) {
    try {
        data.device_name = Platform.OS;
        /* peticion a la API */
        let res = await axios.post("login", data);

        // console.log("DESDE LOGIN FUNCTION "+ JSON.stringify(res.data.data.cliente));
        await setItemAsync(USER_TOKEN_KEY, res.data.data.token);
        await setItemAsync(USER_KEY, JSON.stringify(res.data.data.cliente));// respuesta del server
        return res.data;
    } catch (e) {
        console.log("desde login",e);
        throw errorHandler(e);
    }

}
/* function para crear la cuenta */
export async function signup1(data) {
    // console.log(data);
    try {
        // console.log("entrando");
        let res = await axios.post("signup", data);
        console.log("CREANDO ",res)
        return res.data.message;
    } catch (e) {
        console.log(e);
        throw errorHandler(e);

    }

}

/* ELIMINA EL TOKEN DE USUARIO AL CERRAR SESION */
export async function logout() {
    try {
        let res = await axios.post("logout");
        await deleteItemAsync(USER_TOKEN_KEY);
        await deleteItemAsync(USER_KEY);
        return res.data;
    } catch (e) {
        throw errorHandler(e);
    }

}

//OBTENER CONTRATOS ESFECIFICOS DEL CLIENTE




