const expressApp = require('./express').default;

const PROT = process.env.PORT || 3000;

expressApp.listen(PROT, () => {
    console.log(`Express server listening on port ${PROT}`);
});