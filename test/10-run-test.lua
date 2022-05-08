-- https://github.com/silentbicycle/lunatest/blob/master/test.lua
local lunatest = require "lunatest"
local assert_equal, assert_not_equal = lunatest.assert_equal, lunatest.assert_not_equal

pcall(require, "luacov")
package.path = package.path .. ";../game/?.lua"

print("========")
local args = {...}
print(args[1])
print("========")
lunatest.suite("test_entity")
lunatest.suite("test_component")

lunatest:run()
