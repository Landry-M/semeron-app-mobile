import apikey from '../apikey.js';

//recuperation de tout les articles toutes categ confondu
export default function get_publication_by_id(id) {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?filter[_id]=' + id + '&token=' + apikey)
        .then(res => res.json());
};

