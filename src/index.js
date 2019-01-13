const app = require('./app');
const port = process.env.PORT || 3000;

require('./sampleData');

app.listen(port, () => {
    console.log(`App listening on PORT:${port}`);
});
