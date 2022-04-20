local lunatest = require "lunatest"
local assert_equal = lunatest.assert_equal
local assert_error = lunatest.assert_error
local assert_nil, assert_not_nil = lunatest.assert_nil, lunatest.assert_not_nil


local entity = require "entity"

local test_entity = {}

function test_entity.test_error_createEntity()
    assert_error(function() entity:creaEntity() end)
end

function test_entity.test_create_world()
    assert_nil(entity.world)
    entity:createWorld()
    assert_not_nil(entity.world)
    entity:dropWorld()
    assert_nil(entity.world)
end

function test_entity.test_create_entity()
    entity:createWorld()
    local i = entity:createEntity()
    assert_equal(i, 1)
    entity:dropWorld()
end

return test_entity
