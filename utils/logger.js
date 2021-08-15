const { format } = require('winston');
const winston = require('winston');
const {timestamp, label, combine, printf, colorize} = winston.format;

const customFormat = printf(({level, message, label, timestamp})=>{
    return `${timestamp} [${label}] ${level}::: ${message}`;
});

module.exports = function(moduleName){
    return winston.createLogger({
        level:'debug', // for production change it to error
        format:combine(
            label({label:moduleName}),timestamp(), colorize(), customFormat
        ),
        transports:[
            new winston.transports.File({
                filename:'logs/errors.log',
                level:'error',
                colorize:true,
                maxFiles:5,
                maxsize: 20971520 
            }),
            new winston.transports.File({
                filename:'logs/combined.log',
                colorize:true,
                maxFiles:5,
                maxsize: 20971520 // 20MB
            })
        ]
    })
}

