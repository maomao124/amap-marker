<template>
    <div>
        <div id="container"></div>
        <div v-show="map!=null">
            <button @click="add">添加点标记</button>
            <button @click="addMore(100)">添加100个点标记</button>
            <button @click="addMore(1000)">添加1000个点标记</button>
            <button @click="addMore(10000)">添加10000个点标记</button>
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
            icon: {
                type: "image", //图标类型，现阶段只支持 image 类型
                image: "https://a.amap.com/jsapi_demos/static/demo-center/marker/express2.png", //可访问的图片 URL
                size: [64, 30], //图片尺寸
                anchor: "center", //图片相对 position 的锚点，默认为 bottom-center
            },
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
            const labelsLayer = new AMap.LabelsLayer({
                zooms: [3, 20],
                zIndex: 1000,
                collision: true, //该层内标注是否避让
                allowCollision: true, //不同标注层之间是否避让
            });

            const labelMarker = new AMap.LabelMarker({
                position: [100 + Math.random() * 22, 22 + Math.random() * 20],
                name: "标注",
                zIndex: 16,
                rank: 1, //避让优先级
                icon: this.icon,
            })

            labelsLayer.add(labelMarker);
            this.map.add(labelsLayer);
        },
        addMore(size)
        {
            const labelsLayer = new AMap.LabelsLayer({
                zooms: [3, 20],
                zIndex: 1000,
                collision: true, //该层内标注是否避让
                allowCollision: true, //不同标注层之间是否避让
            });
            const markerList = [];
            for (let i = 0; i < size; i++)
            {
                const labelMarker = new AMap.LabelMarker({
                    position: [100 + Math.random() * 22, 22 + Math.random() * 20],
                    name: "标注",
                    zIndex: 16,
                    rank: 1, //避让优先级
                    icon: this.icon,
                })
                markerList.push(labelMarker);
            }
            labelsLayer.add(markerList);
            this.map.add(labelsLayer);
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
