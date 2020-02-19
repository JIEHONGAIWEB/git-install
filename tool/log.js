
const log4js = require('log4js');
const LogFile = log4js.getLogger();
const LogFile_info = log4js.getLogger('info');
const LogFile_error = log4js.getLogger('error');

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        info: { type: 'file', filename: './logs/info.log' },
        "just-errors": { type: 'file', filename: './logs/error.log' },
        'error': { type: 'logLevelFilter', appender: 'just-errors', level: 'error' },
    },
    categories: {
        default: { appenders: ['out', 'info', 'error'], level: 'info' }//去掉'out'。控制台不打印日志
    }
});
// LogFile.info('You can find logs-files in the log-dir');  
// LogFile_info.info('~~~~~~~info log~~~~~~~~~');  

module.exports = { LogFile, LogFile_info, LogFile_error }