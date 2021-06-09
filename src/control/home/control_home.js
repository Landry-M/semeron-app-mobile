import apikey from '../apikey.js';

export default function get_caroussel() {
    return fetch('https://semeron.heaventech.org/api/collections/get/slides?token=' + apikey)
        .then(res => res.json());
};

//recuperation des 7 articles toutes categ confondu (textuelle et image)
export function get_latest_content() {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?token=' + apikey,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // filter: {published:true},
                //fields: {fieldA: 1, fieldB: 1},
                limit: 7,
                //skip: 5,
                sort: { _created: -1 },
                //populate: 1, // resolve linked collection items

                //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
            })
        }).then(res => res.json());
};

export function partner_logo() {
    return fetch('https://semeron.heaventech.org/api/collections/get/partners?token=' + apikey)
        .then(res => res.json());
};

//recup des 7 plus recents articles
export function get_audio_article() {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?filter[type]=audio&token=' + apikey,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // filter: {published:true},
                //fields: {fieldA: 1, fieldB: 1},
                limit: 7,
                //skip: 5,
                sort: { _created: -1 },
                //populate: 1, // resolve linked collection items

                //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
            })
        }).then(res => res.json());
}

//recup des 7 derniers article textuelles
export function get_text_article() {
    return fetch('https://semeron.heaventech.org/api/collections/get/magazines?filter[type]=texte&token=' + apikey,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // filter: {published:true},
                //fields: {fieldA: 1, fieldB: 1},
                limit: 10,
                //skip: 5,
                sort: { _created: -1 },
                //populate: 1, // resolve linked collection items

                //lang: 'de' // return normalized language fields (fieldA_de => fieldA)
            })
        }).then(res => res.json());
}
