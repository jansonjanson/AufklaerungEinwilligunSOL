const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

code = code.replace('<StyledTextarea\n                      label="Reflexion der Ausbildungssituation"', '<StyledTextarea\n                      color="purple"\n                      label="Reflexion der Ausbildungssituation"');
code = code.replace('<StyledTextarea\n                      label="Ziele des Praxiseinsatzes"', '<StyledTextarea\n                      color="rose"\n                      label="Ziele des Praxiseinsatzes"');

fs.writeFileSync('src/CaseContent.tsx', code);
