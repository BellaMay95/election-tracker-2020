const { JSDOM } = require( "jsdom" );
const axios = require("axios");
const fs = require("graceful-fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const stateList = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];

var stateData = require('./stateData.json');

function getStateData(state) {
    return new Promise((resolve, reject) => {
        // console.log("getting data for state " + state);
        let url = 'https://www.yahoo.com/elections/state/' + state;

        return axios.get(url)
        .then((response) => {
            // console.log("success!");
            let document = new JSDOM(response.data).window.document;
    
            let reported = document.querySelector(".ballot-results-percentage").innerHTML;
    
            let tableData = document.querySelector('.table');
            let presidentData = tableData.querySelectorAll('.table-row');
    
            parseStateData(state, presidentData, reported)
            .then(() => {
                // console.log("finished parsing!");
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
        // console.log("starting parse...");
        stateData[state].reported = Number(reported.substring(0, reported.length - 1))/100;

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
        stateData[state].trumpPercent = (trumpVotes/totalVotes);
        stateData[state].bidenPercent = (bidenVotes/totalVotes);

        resolve();
    });    
}

async function printStateData() {
    fs.writeFile('stateData.txt', JSON.stringify(stateData), () => {
        console.log('wrote JSON to file!');
    });

    var csvWriter = createCsvWriter({
        path: 'stateData.csv',
        header: [
            {id: 'name', title: 'State'},
            {id: 'reported', title: "Reported %"},
            {id: 'Trump', title: 'Trump Votes'},
            {id: 'Biden', title: 'Biden Votes'},
            {id: 'trumpPercent', title: 'Trump %'},
            {id: 'bidenPercent', title: 'Biden %'},
            {id: 'totalVotes', title: 'Total Votes'}
        ]
    });

    let csvData = await restructureStateData(stateData)

    csvWriter.writeRecords(csvData)
    .then(() => {
        console.log('Finished writing to CSV File!');
    })
}

function restructureStateData(data) {
    return new Promise((resolve, reject) => {
        var newData = new Array();

        for (let i = 0; i < stateList.length; i++) {
            newData.push(data[stateList[i]]);
        }

        resolve(newData);
    });
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