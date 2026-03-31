const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!/\.(vue|js|ts|html)$/i.test(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  
  // Replace BlueOS with CoratiaOS
  // But ignore:
  // - bluerobotics/BlueOS
  // - BlueOS- (e.g. BlueOS-1.0)
  // - /BlueOS/issues (github links)
  // - const project = 'BlueOS' ? actually wait, no, project = 'BlueOS' might be used for something? 
  //   In main.ts: const project = 'BlueOS'; ... console.log('%c ' + project + ' %c ' + 'v' + version ...) - this is safe to replace
  // - const repository = 'BlueOS' (in helper_functions.ts, it's used for fetching releases) -> AVOID THIS
  
  let newContent = content;
  
  // A regex that matches BlueOS but not if preceded by 'bluerobotics/' or followed by '-' or '/issues' or if it's the exact line "const repository = 'BlueOS'"
  
  const lines = newContent.split('\n');
  let changed = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Skip repository const in helper_functions
    if (line.includes("const repository = 'BlueOS'")) {
        continue;
    }

    // Replace BlueOS with CoratiaOS
    let newLine = line.replace(/BlueOS/g, (match, offset, string) => {
      const preceding = string.substring(Math.max(0, offset - 15), offset);
      const following = string.substring(offset + 6, Math.min(string.length, offset + 6 + 15));
      
      if (preceding.toLowerCase().includes('bluerobotics/')) return 'BlueOS'; // Github URL
      if (following.startsWith('-')) return 'BlueOS'; // e.g., BlueOS-1.0
      if (following.startsWith('/')) return 'BlueOS'; // e.g., BlueOS/issues

      return 'CoratiaOS';
    });

    if (line !== newLine) {
      lines[i] = newLine;
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Replaced in ${filePath}`);
  }
}

walkDir('d:/Apps/BlueOS/v2/BlueOS/core/frontend/src', processFile);
