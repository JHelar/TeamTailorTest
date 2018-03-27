import _ from 'lodash';
import fp from 'lodash/fp'

const API_KEY = 'nCJ8xT3OvT5YHBOHk-OF6_9QTxry1mWgy_StA0PZ';
const VERSION = 20161108;
const BASE_URL = 'https://api.teamtailor.com/v1';

const makeFetch = method => (url, data) => {
    const headers = {
        'Authorization': `Token token=${API_KEY}`,
        'X-Api-Version': VERSION,
        'Content-Type': 'application/vnd.api+json'
    };
    let options = {
        method,
        headers,
    }
    if(data){
        options = _.assign(options, { body: data })
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

const makeParam = (name, value) => `${name}=${value}`;
const makeFilterParam = (name, value) => makeParam(`filter[${name}]`, value);

const makeUrl = endpoint => fp.compose(
    parameters => encodeURI(endpoint + parameters),
    fp.join('&'),    
    fp.flatten
)

const GETRequest = makeFetch('GET');
const POSTRequest = makeFetch('POST');

const jobsEndpoint = (() => {
    const list = options => {
    
        options = options || {};
        const baseOptions = _.omit(options, ['filters'])
        const { filters } = options;
        
        const params = [];
        params.push(_.forOwnMap(baseOptions, makeParam))
        params.push(_.forOwnMap(filters, makeFilterParam))

        const url = makeUrl(`${BASE_URL}/jobs?`)(params);
        return GETRequest(url).then(val => { console.log(val); return Promise.resolve(val)});
    }

    const show = id => GETRequest(`${BASE_URL}/jobs/${id}`);

    return {
        list,
        show,
    }
})();

const candidatesEndpoint = (() => {
    const list = options => {
        options = options || {};
        const baseOptions = _.omit(options, ['filters'])
        const { filters } = options;
        
        const params = [];
        params.push(_.forOwnMap(baseOptions, makeParam))
        params.push(_.forOwnMap(filters, makeFilterParam))

        const url = makeUrl(`${BASE_URL}/candidates?`)(params)

        return GETRequest(url);
    }

    const create = (firstName, lastName, email) => {
        const dataToSend = {
            data: {
                type: 'candidates',
                attributes: {
                    'first-name': firstName,
                    'last-name': lastName,
                    pitch: '',
                    email: email
                }
            }
        };

        const url = `${BASE_URL}/candidates`;
        return POSTRequest(url, JSON.stringify(dataToSend))
    }

    const show = id => {
        const url = `${BASE_URL}/candidates/${id}`;
        return GETRequest(url);
    }

    return {
        list,
        create,
        show
    }
})()

const answersEndpoint = (() => {
    const create = (attributes, candidateId, questionId) => {
        const dataToSend = {
            data: {
                type: 'answers',
                attributes,
                relationships: {
                    candidate: {
                        data: {
                            id: candidateId,
                            type: 'candidates'
                        }
                    },
                    question: {
                        data: {
                            id: questionId,
                            type: 'questions'
                        }
                    }
                }
            }
        };

        const url = `${BASE_URL}/answers`;
        return POSTRequest(url, JSON.stringify(dataToSend));
    }

    return {
        create
    }
})()

const applicationsEndpoint = (() => {
    const create = (candidateId, jobId) => {
        const dataToSend = {
            data: {
                type: 'job-applications',
                attributes:{},
                relationships: {
                    candidate: {
                        data: {
                            id: candidateId,
                            type: 'candidates'
                        }
                    },
                    job: {
                        data: {
                            id: jobId,
                            type: 'jobs'
                        }
                    }
                }
            }
        };
        const url = `${BASE_URL}/job-applications`;

        return POSTRequest(url, JSON.stringify(dataToSend));
    }

    return {create}
})();

export { jobsEndpoint, candidatesEndpoint, answersEndpoint, applicationsEndpoint, GETRequest};