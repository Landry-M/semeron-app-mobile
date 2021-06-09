import axios from "axios";
//import apikey from '../apikey.js';

const apikey = "7d65569240b829692f72aa15d958b1";

export default function login_user(pseudo, eglise) {
    return fetch('https://semeron.heaventech.org/api/collections/get/users?filter[name]=' + pseudo + '&filter[church]=' + eglise + '&token=' + apikey)
        .then(res => res.json());
};

//sauvegarde d'un compte utilisateur
export function register_user(pseudo, email, eglise) {
    return fetch('https://semeron.heaventech.org/api/collections/save/users?token=' + apikey,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    name: pseudo,
                    email: email,
                    church: eglise
                }
            })
        })
        .then(res => res.json());
};

//recuperer les info d'un user par son nom (utiliser aussi avant la creation de compte)
export function get_user_info(pseudo) {
    return fetch('https://semeron.heaventech.org/api/collections/get/users?filter[name]=' + pseudo + '&token=' + apikey)
        .then(res => res.json());
};

