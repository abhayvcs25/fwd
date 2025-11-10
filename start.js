const { spawn } = require('child_process');
const path = require('path');

function run(cmd, args, cwd) {
  const p = spawn(cmd, args, { cwd, stdio: 'inherit', shell: true });
  p.on('close', (code) => {
    if (code !== 0) {
      process.exit(code);
    }
  });
  return p;
}

const server = run('npm', ['start'], path.join(__dirname, 'server'));
const client = run('npm', ['run', 'dev'], path.join(__dirname, 'client'));

process.on('SIGINT', () => {
  server.kill('SIGINT');
  client.kill('SIGINT');
  process.exit();
});