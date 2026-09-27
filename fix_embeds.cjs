const fs = require('fs');
let code = fs.readFileSync('src/CaseContent.tsx', 'utf8');

// The incorrect embed URL is:
const paEmbedUrl = "https://app.fobizz.com/pinboard/public_boards/cbb73434-0114-4ee8-853d-31788b459d34?embed=true&token=b0cbca55223b034ebf4f4d6038851b70";
const azubiEmbedUrl = "https://app.fobizz.com/pinboard/public_boards/b28a4a86-0543-419d-8d4e-df64affde584?embed=true&token=e57c9cbe6f87eb5d8ee67f6eeacd3cb8";

// 1. Line 220 (inside renderDocumentationStep)
// Let's replace ONLY inside renderDocumentationStep
code = code.replace(
  /\{renderBoard\("https:\/\/app\.fobizz\.com\/pinboard\/public_boards\/cbb73434-0114-4ee8-853d-31788b459d34\?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "Auszubildenden Board"\)\}/,
  `{renderBoard("${azubiEmbedUrl}", "fobizz Azubi-Board")}`
);

// 2. Line 942 (Case 6)
code = code.replace(
  /\{renderBoard\("https:\/\/app\.fobizz\.com\/pinboard\/public_boards\/cbb73434-0114-4ee8-853d-31788b459d34\?embed=true&token=b0cbca55223b034ebf4f4d6038851b70", "fobizz Azubi-Board"\)\}/g,
  `{renderBoard("${azubiEmbedUrl}", "fobizz Azubi-Board")}`
);

fs.writeFileSync('src/CaseContent.tsx', code);
