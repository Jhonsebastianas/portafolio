const devConf = Object.freeze({
    // Información principal
    APP_NAME: 'Jhon Sebastian AS - portafolio',
})

const prodConf = Object.freeze({
    // Información principal
    APP_NAME: 'Jhon Sebastian AS - portafolio',
    PERSONAL_FULLNAME: 'Jhon Sebastian Agudelo Sierra'
});


module.exports = (process.env.NODE_ENV === 'development')? devConf: prodConf