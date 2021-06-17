import apikey from '../apikey.js';

//recuperation de tout les articles toutes categ confondu
export default function get_all_publications(limite, skip) {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?token=' + apikey,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                limit: limite,
                sort: { _created: -1 },

            })
        }).then(res => res.json());
};

//recuperation de tout les articles par categ conf
export function get_all_publications_by_categ(categ, limite, skip) {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?filter[type]=' + categ + '&token=' + apikey,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // filter: {published:true},
                //fields: {fieldA: 1, fieldB: 1},
                limit: limite,
                //skip: 5,
                sort: { _created: -1 },
                //populate: 1, // resolve linked collection items

                //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
            })
        }).then(res => res.json());
};

