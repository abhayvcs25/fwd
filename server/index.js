const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.get('/api/health', (req, res) => {
  res.json({status: 'ok'});
});
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
  });
}
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});