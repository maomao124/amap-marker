<template>
    <div>
        <div id="container"></div>
        <div v-show="map!=null">
            <button @click="add">添加点标记</button>
            <button @click="remove">移除点标记</button>
            <button @click="setContent">设置内容</button>
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
        setContent()
        {
            const content = `<div>
<img src="//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png">
 测试</div>`;
            if (this.marker)
            {
                this.marker.setContent(content);
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
