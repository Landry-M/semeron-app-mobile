import apikey from "../apikey";

export default function search_magazine(texte) {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?filter[title][$regex]=' + texte + '&token=' + apikey)
        .then(res => res.json());
};
