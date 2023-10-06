const fs = require('fs');

const res = require('./resultat.json');

const prompt = require('prompt-sync')({ sigint: true });

let resArray = [];


for (let i = 0; i < res.length; i++) {
  resArray.push(res[i]);
}

try {
  const jsonString = fs.readFileSync('frågor.json', 'utf-8');
  frågor = JSON.parse(jsonString);
} catch (err) {
  console.log("Cannot read JSON file:");
}

let namn = prompt("Vad heter du?: ")
let datum = new Date()
let hdScore = {
  hund: 0,
  katt: 0,
  kanin: 0,
  fisk: 0
};

for (let i = 0; i < 3; i++) {
  let wrongAnswer = false;
  while (!wrongAnswer) {
    let { answers, question } = frågor[i];
    let { ja, nej } = answers
    const userSvar = prompt(question).toLowerCase();
    if (userSvar === "ja") {
      hdScore.hund += ja.hund;
      hdScore.katt += ja.katt;
      hdScore.kanin += ja.kanin;
      hdScore.fisk += ja.fisk;
      wrongAnswer = true;
    } else if (userSvar === "nej") {
      hdScore.hund += nej.hund;
      hdScore.katt += nej.katt;
      hdScore.kanin += nej.kanin;
      hdScore.fisk += nej.fisk;
      wrongAnswer = true;
    } else {
      console.log("Felaktigt svar.");
    }
  }

}

let maxAntal = hdScore.hund + hdScore.katt + hdScore.kanin + hdScore.fisk;

const hdResHund = hdScore.hund / maxAntal * 100 || 0;
const hdResKatt = hdScore.katt / maxAntal * 100 || 0;
const hdResKanin = hdScore.kanin / maxAntal * 100 || 0;
const hdResFisk = hdScore.fisk / maxAntal * 100 || 0;

score = [
  { djur: 'hund', poang: hdResHund },
  { djur: 'katt', poang: hdResKatt },
  { djur: 'kanin', poang: hdResKanin },
  { djur: 'fisk', poang: hdResFisk }
]
score.sort((a, b) => b.poang - a.poang)

person = {
  name: namn,
  datum: datum,
  score: score
}

console.log(person);

resArray.push(person);

fs.writeFile('./resultat.json', JSON.stringify(resArray, null, 2), (err) => {
  if (err) throw err;
  console.log('Dina resultat har nu sparats, Tack och välkommen att svara igen! ');
});
