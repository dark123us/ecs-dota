VER=v2
NAME=vim_ide
REGISTER=hub.cap.by:443

IMAGE=$REGISTER/$NAME:$VER 
CONTAINER=ecs-dota-$NAME

set -a
. ./env
set +a

SRC=$(pwd)
DST=/home/dark123us/ecs-dota
# GAME=game
# CONTENT=content

# PATHGIT=<pathgit.env
# PATHGAME=<pathgame.env
# NAMECUSTOM=<namecustom.env

# PATHDOTAGAME="$PATHDOTALINUX/$GAME/dota_addons"
# PATHDOTACONTENT="$PATHDOTALINUX/$CONTENT/dota_addons"

# PATHDOTAGAMECUSTOM="$PATHDOTAGAME/$NAMECUSTOM"
# PATHDOTACONTENTCUSTOM="$PATHDOTACONTENT/$NAMECUSTOM"

# echo $DOTAGAMEPATH
# echo $DOTACONTENTPATH
# echo $SRC

VOLUMES=( -v $SRC:$DST )
# if [[ -d $PATHDOTAGAMECUSTOM ]]; then
# 	VOLUMES+=( -v "$PATHDOTAGAMECUSTOM":$DST/dota/$GAME )
# 	# VOLUMES+=( -v "${DOTAGAMEPATH// /"\ "}"/:/dota/$GAME )
# else 
# 	echo "Not found $PATHDOTAGAMECUSTOM, passing"
# fi
# if [[ -d $PATHDOTACONTENTCUSTOM ]]; then
# 	VOLUMES+=( -v "$PATHDOTACONTENTCUSTOM":$DST/dota/$CONTENT )
# else 
# 	echo "Not found $PATHDOTACONTENTCUSTOM, passing"
# fi
# 
# VOLUMES+=( -v "$PATHDOTAGAME":$DST/dota2/$GAME )
# VOLUMES+=( -v "$PATHDOTACONTENT":$DST/dota2/$CONTENT )

echo ${VOLUMES[@]}


CMD="cd $DST; sudo -iu dark123us; mc"

docker run -it --rm --name $CONTAINER "${VOLUMES[@]}" $IMAGE bash -c "$CMD"

