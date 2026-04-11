import fs from 'fs';
import path from 'path';

function stripFramerMotion(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Remove import
  content = content.replace(/import\s+\{\s*(?:motion|AnimatePresence)(?:,\s*(?:motion|AnimatePresence))*\s*\}\s+from\s+['"]framer-motion['"];?\n?/g, '');
  content = content.replace(/import\s+motion\s+from\s+['"]framer-motion['"];?\n?/g, '');

  // Strip AnimatePresence wrappers
  content = content.replace(/<AnimatePresence[^>]*>/g, '');
  content = content.replace(/<\/AnimatePresence>/g, '');

  // Replace <motion.div ...> with <div ...>
  content = content.replace(/<motion\.([a-zA-Z0-9]+)/g, '<$1');
  // THE BUG WAS HERE, MISSING `>`
  content = content.replace(/<\/motion\.([a-zA-Z0-9]+)>/g, '</$1>');

  // Strip framer motion props
  const propNames = ['initial', 'animate', 'whileInView', 'viewport', 'transition', 'exit'];
  
  for (let prop of propNames) {
    let propRegex = new RegExp(`\\s+${prop}=\\{`, 'g');
    let match;
    while ((match = propRegex.exec(content)) !== null) {
      let startIdx = match.index;
      let bracketCount = 1;
      let currIdx = startIdx + match[0].length;
      
      while (bracketCount > 0 && currIdx < content.length) {
        if (content[currIdx] === '{') bracketCount++;
        if (content[currIdx] === '}') bracketCount--;
        currIdx++;
      }
      
      content = content.substring(0, startIdx) + content.substring(currIdx);
      propRegex.lastIndex = 0;
    }
  }

  // Remove simple string props
  content = content.replace(/\s+layout="[^"]*"/g, '');
  content = content.replace(/\s+layout\b/g, '');
  
  // Specific to boolean props like initial={false}
  content = content.replace(/\s+initial=\{false\}/g, '');

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Stripped Framer Motion from ${filePath}`);
}

const files = [
  'frontend/src/pages/LandingPage.jsx',
  'frontend/src/pages/SubjectPage.jsx',
  'frontend/src/pages/OrderModal.jsx'
];

for (let file of files) {
  try {
    stripFramerMotion(path.resolve(file));
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
}
