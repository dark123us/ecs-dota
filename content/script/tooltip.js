(function (global) {
    const log = global.logging.getLogger()
    const event = global.event.Event()
    const document = global.document

    const tooltipPanel = {}
    const IDPANEL = 'vdTooltip'
    const ID_PREV_PANEL = 'DOTAAbilityTooltip'
    const ID_IMAGE = 'vdTooltipAbilityImage'
    const IDPARENTPANEL = 'Tooltips'
    const CLASS_HIDE = 'tooltip__main-hide'
    const BOTTOM = 20
    let LABELS = {}
    let VALUES = {}

    const subscribe = (show, hide) => {
        const showid = event.subscribe(
            'DOTAShowAbilityTooltipForEntityIndex',
            params => show(params))
        const hideid = event.subscribe(
            'DOTAHideAbilityTooltip',
            params => hide(params))
    }

    const ToolTip = () => {
        const data = () => {}
        data.init = ({pathXml, labels, values}) => { 
            LABELS = labels
            VALUES = values
            subscribe(data.show, data.hide) 
            document.deletePanel(IDPANEL)

            const tooltip = document.createPanel(
                IDPANEL, IDPARENTPANEL)
            //tooltip.visible = false
            tooltip.BLoadLayout(pathXml, false, false)
            tooltipPanel.main = tooltip

            tooltipPanel.img = document.getElementById(ID_IMAGE)

            const tmp = Object.values(tooltip.Children()).map(
                m => {return {id:m.id}}
            ) 
            log.debug(document.getParents(tooltip))
            log.debug(JSON.stringify(tmp))
            return data
        }

        data.show = (p) => { 
            log.debug({show: p})
            log.debug({name: p.params2})
            const tmp = Entities.GetAllEntitiesByName(p.params2)
            const tmp2 = Entities.GetAbilityByName(p.params3, p.params2)
            const tmp3 = Abilities.GetAbilityTextureName(tmp[0])

            log.debug({tmp, tmp2, tmp3})
            tooltipPanel.main.visible = true;
            log.debug({panelprev: tooltipPanel.prev})
            if (tooltipPanel.prev == null)
                tooltipPanel.prev = document.getElementById(ID_PREV_PANEL)
            log.debug({panelprev: tooltipPanel.prev})
            if (tooltipPanel.prev) 
                tooltipPanel.prev.visible = false
            
            const w = GameUI.GetCursorPosition()[0] + 20

            const h = tooltipPanel.main.contentheight;
            const h2 = Game.GetScreenHeight() - BOTTOM - h
            log.debug({h, h2, w})
            tooltipPanel.main.style.transform = "translate3d("+ w +"px, " + h2 +"px, 0px)"

            const f = 'file://{images}/spellicons/'+tmp3+'.png'
            // tooltipPanel.img.abilityname = tmp3
            // tooltipPanel.img.abilityid = tmp2
            tooltipPanel.img.SetImage(f)
            log.debug({f, p: tooltipPanel.img})
            
            const m = 'HEAVY TANK FACTORY2'
            Object.entries(VALUES[tmp3]).forEach(([k,v]) => {
                if (v instanceof Array) {
                    for (let i=0; i<3; i++){
                        let key = "" + k + i
                        let val = (v[i]!==undefined)?v[i].toString():""
                        tooltipPanel.main.SetDialogVariable(key, val)
                    }
                }else{
                    tooltipPanel.main.SetDialogVariable(k, v.toString())
                }
            })

            Object.entries(LABELS).forEach(([k,v]) => {
                tooltipPanel.main.SetDialogVariable(k, v.toString())
            })
            return data
        }

        data.hide = () => { 
            log.debug('hide')
            tooltipPanel.main.visible = false
            // if (!tooltipPanel.main.BHasClass(CLASS_HIDE))
            //     tooltipPanel.main.AddClass(CLASS_HIDE)
            return data
        }
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

