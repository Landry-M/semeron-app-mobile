import apikey from '../apikey.js';

//recup des 7 plus recents articles
export default function get_all_favorite(id_user) {
    return fetch('https://semeron.heaventech.org/api/collections/get/favoris?filter[id_user]=' + id_user + '&token=' + apikey,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // filter: {published:true},
                //fields: {fieldA: 1, fieldB: 1},
                //limit: 7,
                //skip: 5,
                sort: { _created: -1 },
                //populate: 1, // resolve linked collection items

                //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
            })
        }).then(res => res.json());
};


export function update_profil(user_id, name, email, eglise) {
    return fetch('https://semeron.heaventech.org/api/collections/save/users?filter[_id]=' + user_id + '&token=' + apikey,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    name: name,
                    email: email,
                    church: eglise
                },
                // filter: {published:true},
                //fields: {fieldA: 1, fieldB: 1},
                //limit: 7,
                //skip: 5,
                //sort: { _created: -1 },
                //populate: 1, // resolve linked collection items

                //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
            })
        }).then(res => res.json());

};
