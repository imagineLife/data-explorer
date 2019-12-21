let res = ``
let howManyRows = 50;
let st = new Date()
function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// id,hosp,station,riskScore,outlierOccurances,daysOpen,lastActivity,meds
let hospArr = ['HospA', 'HospB', 'HospC'];
let stationArr = ['ER', 'HeartSpot', 'PACU'];
let meds = ['heroin','cocaine','methamphetamine','dxm','mdma', 'Psilocybin']

for(let i = 1; i <=howManyRows; i++){
	let thisID = randomInt(100,999)
	let thisHops = hospArr[Math.floor(Math.random()*hospArr.length)]
	let thisStation = stationArr[Math.floor(Math.random()*stationArr.length)]
	let thisRisk = randomInt(75,99)
	let occs = randomInt(4,17)
	let days = randomInt(2,24)
	let lastAct = randomInt(30,720)
	let medCount = randomInt(1,6)
	
	//MEDS ARRAY
	// let thisMeds = []
	// for(let i = 1; i <=medCount; i++){
	// 	let rndMed = meds[Math.floor(Math.random()*meds.length)]
	// 	thisMeds = [...thisMeds, rndMed]
	// }

	let resStr = `user-${thisID},${thisHops},${thisStation},${thisRisk},${occs},${days},${lastAct}\n` //,${JSON.stringify(thisMeds)}
	res += resStr
}

let end = new Date()
let dur = end - st;
console.log(`%c ---Duration to create ${howManyRows} rows: ${dur}`, 'background-color: orange; color: white;')

console.log('res')
console.log(res)
