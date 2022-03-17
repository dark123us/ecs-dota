(function (global) {
    const log = global.logging.getLogger()
    const event = global.event.Event()
    const document = global.document
    
    const subscribe = (show, hide) => {
        const showid = event.subscribe(
            'DOTAShowAbilityTooltipForEntityIndex',
            params => show(params))
        const hideid = event.subscribe(
            'DOTAHideAbilityTooltip',
            params => hide(params))
    }

    const ToolTip = () => {
        const panel = {}
        const data = () => {}
        data.init = (pathXml) => { 
            subscribe(data.show, data.hide) 
            document.deletePanel("vdTmp")
            const tooltip = document.createPanel(
                'vdTmp', 'Contents')
            tooltip.BLoadLayout(pathXml, false, false)
            panel.tooltip = tooltip
            const tmp = Object.values(tooltip.Children()).map(
                m => {return {id:m.id}}
            ) 
            log.debug(document.getParents(tooltip))
            log.debug(JSON.stringify(tmp))
        }
        data.show = (p) => { log.debug(p)}
        data.hide = () => { log.debug('hide')}
        return data
    }

    const NAME = "tooltip"
    const UNIT = {[NAME]: {ToolTip}}
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

