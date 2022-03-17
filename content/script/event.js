(function (global) {
    const log = global.logging.getLogger();

    const subscribers = {}
    const Event = () => {
        const events = [
            'DOTAShowAbilityTooltipForEntityIndex',
            'DOTAHideAbilityTooltip',
        ]
        const eventEmit = (name, params) => {
            if (name in subscribers)
                Object.values(subscribers[name].notify)
                    .map((callback)=> {
                        callback(params)
                    })
        }
        const data = () => {}
        data.subscribe = (name, callback) => {
            if (!(name in subscribers))
                subscribers[name] = {id: 0, notify:{}}
            
            const id = subscribers[name].id + 1
            subscribers[name].id = id
            subscribers[name].notify[id] = callback
            return id
        }
        data.unsubscribe = (name, id) => {
            if (name in subscribers 
                && id in subscribers[name].notify)
                delete  subscribers[name].notify[id]
        }
        data.emit = (name, params) => {
            eventEmit(name, params)
            return data
        }
        data.init = () => {
            events.map(name => {
                $.RegisterForUnhandledEvent(
                    name, 
                    (params1, params2, params3, params4, params5) => eventEmit(name, 
                        {params1, params2, params3, params4, params5}))
            })
            return data
        }
        return data
    }

    const NAME = "event"
    const UNIT = {[NAME]: {Event}}
    if (typeof define === "function" && define.amd) {
        define(UNIT[NAME]);
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = UNIT[NAME];
    } else {
        const prev = '_prev' + NAME
        UNIT[NAME][prev] = global[NAME];
        UNIT[NAME].noConflict = function () {
            global[NAME] = UNIT[NAME][prev]
            return UNIT[NAME];
        };
        global[NAME] = UNIT[NAME];
    }
})(this)


