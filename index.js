const { JSDOM } = require( "jsdom" );
const axios = require("axios");
const fs = require("graceful-fs");

const stateList = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

var stateData = require('./stateData.json');
const { type } = require("jquery");

function getStateData(state) {
    return new Promise((resolve, reject) => {
        console.log("getting data for state " + state);
        let url = 'https://www.yahoo.com/elections/state/' + state;

        return axios.get(url)
        .then((response) => {
            console.log("success!");
            let document = new JSDOM(response.data).window.document;
    
            let reported = document.querySelector(".ballot-results-percentage").innerHTML;
    
            let tableData = document.querySelector('.table');
            let presidentData = tableData.querySelectorAll('.table-row');
    
            parseStateData(state, presidentData, reported)
            .then(() => {
                console.log("finished parsing!");
                resolve();
            })
            .catch((error) => {
                reject();
            });
        })
        .catch((error) => {
            console.log("ERROR");
            console.log(error);

            reject(error);
        })
    })
}

function parseStateData(state, data, reported) {
    return new Promise((resolve, reject) => {
        console.log("starting parse...");
        stateData[state].reported = Number(reported.substring(0, reported.length - 1));

        let totalVotes = 0;
        let trumpVotes = 0;
        let bidenVotes = 0;

        for (var i = 0; i < data.length; i++) {
            let name = data[i].querySelector(".name-first").nextSibling.innerHTML;
            let votes = Number(data[i].querySelector(".votes").firstChild.innerHTML.replace(/,/g,''));

            if (name === "Trump") {
                trumpVotes = votes;
            } else if (name === "Biden") {
                bidenVotes = votes;
            }

            totalVotes += votes;
        }

        stateData[state].Trump = trumpVotes;
        stateData[state].Biden = bidenVotes;
        stateData[state].totalVotes = totalVotes;

        resolve();
    });    
}

function printStateData() {
    fs.writeFile('stateData.txt', JSON.stringify(stateData), () => {
        console.log('wrote to file!');
    });

    console.log(stateData);
}

function fetchAllData() {
    callData().then(() => {
        printStateData();
    })
}

async function callData() {
    return new Promise(async (resolve, reject) => {
        for (var i = 0; i < stateList.length; i++) {
            await getStateData(stateList[i])
            console.log("finished request for state " + stateList[i]);
        }

        resolve();
    })
}

fetchAllData();