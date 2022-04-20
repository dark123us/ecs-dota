Run test
========

::
    
    dark123us@683c1666b560:~/ecs-dota$ while true; do inotifywait -r ./test -r ./game -e modify; cd test; lua run.lua; cd ..;  done
