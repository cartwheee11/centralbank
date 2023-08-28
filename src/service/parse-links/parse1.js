const base = '../../../public/'
const fs = require('fs');
dir = fs.readdirSync('../../../public');
dir = dir.slice(1, dir.length);
const file = fs.readFileSync(base + dir[1], 'utf8');

const result = [];

dir.forEach(name => {
  const file = fs.readFileSync(base + name, 'utf8');

  const match = file.match(/"https:\/\/r\.mobirisesite\.com.*"/g);

  match.forEach(elem => {   
    const str = elem.split('"')[1];
    
    if(result.indexOf(str) === -1) {
      result.push(str);
    }
  });
});


console.log(result);