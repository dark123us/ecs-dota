const initlogging = () => {
    logging = () => {
        return {
            debug: (msg) => {},
            error: (msg) => {},
            info: (msg) => {},
        }
    }
}
try {
    if (logging === undefined) {initlogging()}
} catch(e){
    initlogging()
}


const log = logging()

log.debug("test")
