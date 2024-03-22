<template>
    <div>
        <div id="container"></div>
        <div v-show="map!=null">
            <button @click="add">添加点标记</button>
            <button @click="addMore(100)">添加100个点标记</button>
            <button @click="addMore(1000)">添加1000个点标记</button>
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
            const marker = new AMap.Marker({
                position: [100 + Math.random() * 22, 22 + Math.random() * 20],
            })
            this.map.add(marker);
        },
        addMore(size)
        {
            const markerList = [];
            for (let i = 0; i < size; i++)
            {
                const marker = new AMap.Marker({
                    position: [100 + Math.random() * 22, 22 + Math.random() * 20],
                })
                markerList.push(marker);
            }
            this.map.add(markerList)
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
