local entity = {}

function entity.createWorld()
    if entity.world == nil then
        entity.world = {id = 0}
    end
end

function entity.dropWorld()
    if entity.world ~= nil then
        entity.world = nil
    end
end

function entity.createEntity()
    if entity.world == nil then
        error("world is nil")
    end
    local id = entity.world.id + 1
    entity.world.id = id
    return id
end

return entity
