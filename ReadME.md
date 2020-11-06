# Welcome to the Election Tracker!

## Prerequisites
- NodeJS installed (tested with version 12.16.2)

## Steps to Update the Tracker
1. Run the Script
2. Update the Excel Sheet
3. View and Analyse the Results

## How to Run the Script
1. Clone the Repository
2. Open a terminal and run the command: `npm install` to download the dependencies
3. Run the command: `npm start` to pull the script

## How to Update the Tracker
1. The script generated a file "stateData.csv". Open the file in Excel (or other spreadsheet viewer) as well as the "ElectionTracker2020.xlsx" file
2. Copy the following columns between the files:
		- stateData.csv "Reported %" column => ElectionTracker2020.xlsx "% Reported" column
		- stateData.csv "Trump %" column => ElectionTracker2020.xlsx "Trump % of Reported" column
		- stateData.csv "Biden %" column => ElectionTracker2020.xlsx "Biden % of Reported" column
		- stateData.csv "Total Votes" column => ElectionTracker2020.xlsx "Total Votes of Reported" column
  
## How to View the Results
- This spreadsheet deals with *POSSIBILITIES*, not _Probabilities_. 
		- Example: Based on California's reported percentage, Trump could possibly still win, but anybody familiar with American politics knows that the day California goes red will be the day that hell freezes over.
- Electoral vote split (of confirmed wins based on _possibilities_) is found on columns P & Q, row #1-2
		- This does NOT take into account the Congressional Split of Electoral Votes in Maine and Nebraska. See the "Other Observations" section for details on how that works.
- Overall popular vote split is found on columns P & Q, rows #4-5
- Column O breaks down the winner of each state, based on whether adding the "margin uncounted %" to the loser could change the winner
- Column N, the Margin Uncounted %, is how much a candidate could win if they received ALL of the uncounted votes
 
## Other Observations
- If you look at the electoral votes column vs. what news outlets report and compare with the percentage vote split, the states that Trump wins are usually by a larger margin. The states that Biden wins (or projected to win) are by the slimmer margin, which is why in many cases the tracker still calls it as undecided
- If you look at the vote breakdown on the county level (not shown in spreadsheet), other than Democrat strongholds such as New England, District of Colombia, and California, usually Democrats win the bigger cities and Republicans will win the other parts of the state.
- Notable exceptions to the "winner takes all" electoral vote grab
		- Maine and Nebraska use the congressional district breakdown. 2 electoral votes go to the overall winner for their state and the remaining votes go to the winner of each congressional district.
		- Nevada has a "none of these candidates" option on their ballot
- 3rd party vote: America is largely a 2-party political system, but there are 3rd party candidates that appear on ballots. Below are some states where 3rd-party votes could have changed the outcome in this election. This is based on the margin of victory in these states and the percentage of 3rd-party vote.
		- Michigan: lack of 3rd party vote would have made for a tighter race
		- Arizona: lack of 3rd party vote would have made for a tighter race
		- Georiga: lack of 3rd party vote would have nearly guaranteed a Trump win
		- Nevada: 3rd party vote may give Biden a win here
		- North Carolina: lack of 3rd party vote would have made for a Trump win
		- Pennsylvania: lack of 3rd party vote would have made for a tighter race
		- Wisconsin: lack of 3rd party vote would have made for an even tighter race, possibly a Trump win
