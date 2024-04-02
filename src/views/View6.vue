<template>
    <div>
        <div id="container"></div>
        <div v-show="map!=null">
            <button @click="add">添加文本标记</button>
            <button @click="remove">移除文本标记</button>
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
            const marker = new AMap.Text({
                text: "纯文本标记", //标记显示的文本内容
                anchor: "center", //设置文本标记锚点位置
                draggable: true, //是否可拖拽
                cursor: "pointer", //指定鼠标悬停时的鼠标样式。
                angle: 10, //点标记的旋转角度
                style: {
                    //设置文本样式，Object 同 css 样式表
                    "padding": ".75rem 1.25rem",
                    "margin-bottom": "1rem",
                    "border-radius": ".25rem",
                    "background-color": "white",
                    "width": "15rem",
                    "border-width": 0,
                    "box-shadow": "0 2px 6px 0 rgba(114, 124, 245, .5)",
                    "text-align": "center",
                    "font-size": "20px",
                    "color": "blue",
                },
                position: [100 + Math.random() * 22, 22 + Math.random() * 20], //点标记在地图上显示的位置
            });
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
