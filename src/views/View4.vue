<template>
    <div>
        <div id="container"></div>
        <div v-show="map!=null">
            <button @click="add">添加点标记</button>
            <button @click="remove">移除点标记</button>
            <button @click="setIcon">设置图标</button>
        </div>
    </div>
</template>

<script>
import {initAMap, destroy} from '../utils/amapUtils'

export default {
    name: "View1",
    data()
    {
        return {
            map: null,
            marker: null,
        }
    },
    watch:
        {
            map(map)
            {
                console.log("map对象变化")
                map.on('complete', function ()
                {
                    //地图图块加载完成后触发
                    console.log("加载完成")
                });
            }
        },
    methods: {
        add()
        {
            if (this.marker)
            {
                return;
            }
            const marker = new AMap.Marker({
                position: [100 + Math.random() * 22, 22 + Math.random() * 20],
                offset: new AMap.Pixel(-10, -10),
            })
            this.marker = marker;
            this.map.add(marker);
        },
        remove()
        {
            if (this.marker)
            {
                this.map.remove(this.marker);
                this.marker = null;
            }
        },
        setIcon()
        {
            if (this.marker)
            {
                this.marker.setIcon("//vdata.amap.com/icons/b18/1/2.png");
            }
        }
    },
    created()
    {
        console.log("初始化")
        initAMap(this);
    },
    beforeDestroy()
    {
        console.log("销毁")
        destroy(this.map)
    },
}
</script>

<style scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 88vh;
}
</style>
