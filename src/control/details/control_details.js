import apikey from '../apikey.js';

//recuperation de tout les articles toutes categ confondu
export default function get_publication_by_id(id) {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?filter[_id]=' + id + '&token=' + apikey)
        .then(res => res.json());
};

//
export function add_mag_to_favorite(id_user, id_mag) {
    return fetch('https://semeron.heaventech.org/api/collections/save/favoris?token=' + apikey,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    id_user: id_user,
                    id_mag: id_mag,
                }
            })
        })
        .then(res => res.json());
}