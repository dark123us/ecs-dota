local args = {...}
local directory = args[1]
print('start ecsdota.lua', directory)


local module = {}
for _, n in pairs({'component', 'entity', 'event', 'system', 'world'}) do
    module[n] = require (directory.. '.'..n )
end


return module
