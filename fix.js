const fs = require('fs');
const filepath = 'src/components/layout/app-sidebar.tsx';
let content = fs.readFileSync(filepath, 'utf8');
content = content.replace(/group-data-\[state=collapsed\]:group-hover:/g, 'group-hover:!');
fs.writeFileSync(filepath, content);
console.log('Fixed Tailwind classes in app-sidebar.tsx');
