local lunatest = require "lunatest"
local assert_equal = lunatest.assert_equal


local component = require "component"
local entity = require "entity"

local test_component = {}


function test_component.test_add_component()
    entity:createWorld()
    entity:registerComponent({ComponentTest})
    local i = entity.createEntity()

    entity:dropWorld()
end

local ComponentTest = {
    x = 0,
    y = 5
}

return test_component

