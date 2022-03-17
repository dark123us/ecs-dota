(function (global) {
    const log = global.logging.getLogger();

    var root = null

    const getDotaHud = () => {
        root = $.GetContextPanel()
        while (root !== null && root.id !== 'DotaHud'){
            root = root.GetParent();
        }
        return root
    }
    const getElementById = (id) => {
        if (root === null) getDotaHud()
        if (root !== null){
            return root.FindChildTraverse(id);
        }
    }
    const createPanel = (id, parentid) => {
        const panel = $.CreatePanel(
            "Panel",
            getElementById(parentid),
            id, 
        )
        return panel
    }

    const getParents = (panel) => {
        var res = []
        var panel = getElementById(panel.id)
        while (panel !== null && panel.id !== 'DotaHud'){
            panel = panel.GetParent()
            res.push(panel.id)
        }
        return res
    }

    const deletePanel = (id) => {
        const panel = getElementById(id)
        if (panel !== null)
            panel.RemoveAndDeleteChildren()

    }

    const Document = () => {
        const data = () => {}
        data.getElementById = getElementById
        data.createPanel = createPanel
        data.getParents = getParents
        data.deletePanel = deletePanel
        return data
    }

    const NAME = "document"
    const UNIT = {[NAME]: Document()}
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

