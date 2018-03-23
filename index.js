const fetch = require('node-fetch');
const _ = require('lodash');
const fp = require('lodash/fp');
const API_KEY = 'SUlgEiNup-VFYKT2BQVHWGk3hAMEYEB_v1MvNWxs';
const VERSION = 20161108;
const BASE_URL = 'https://api.teamtailor.com/v1';

const makeFetch = method => (url, data) => {
    const headers = {
        'Authorization': `Token token=${API_KEY}`,
        'X-Api-Version': VERSION
    };
    let options = {
        method,
        headers,
    }
    if(data){
        options = _.assign(options, {data})
    }
    return fetch(url, options)
        .then(val => val.json())
        .then(json => {
            return new Promise((res, rej) => {
                if(!json || json.errors) {
                    rej(json);
                }
                else res(json.data || {});
            })
        });
}

_.forOwnMap = function(object, func) {
    const returnArray = [];
    this.forOwn(object, (key, val) => returnArray.push(func(val, key)));
    return returnArray;
}

const GETRequest = makeFetch('GET');


const jobsEndpoint = () => {
    const makeParam = (name, value) => `${name}=${value}`;
    const makeFilterParam = (name, value) => makeParam(`filter[${name}]`, value);

    const makeUrl = endpoint => fp.compose(
        p => encodeURI(endpoint + p),
        fp.join('&'),    
        fp.flatten
    )

    const list = options => {
    
        options = options || {};
        const baseOptions = _.omit(options, ['filters'])
        const { filters } = options;
        
        const params = [];
        params.push(_.forOwnMap(baseOptions, makeParam))
        params.push(_.forOwnMap(filters, makeFilterParam))

        const url = makeUrl(`${BASE_URL}/jobs?`)(params);
        return GETRequest(url);
    }

    const show = id => GETRequest(`${BASE_URL}/jobs/${id}`);

    return {
        list,
        show,
    }
}

const jobs = jobsEndpoint();

const getLocationPromise = jobdata => GETRequest(jobdata.relationships.location.links.related)
const getIframeUrl = jobdata => jobdata.links['careersite-job-apply-iframe-url'];
const getLocationObject = locationdata => ({ ...locationdata })

jobs.list({
        include: ['location'],
        pagesize: 15,
    })
    .then(data => Promise.all(_.map(data, d => ({ links: d.links, name: d.attributes.title }))))
    .then(datas => console.log(datas))
    .catch(err => console.error('Error: ', err));
