import AMapLoader from '@amap/amap-jsapi-loader';
const defaultPlugin = [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.Geolocation',
    'AMap.MarkerClusterer',
    'AMap.Geocoder'
];
/**
 * 初始化地图
 * @param that vue视图的this指针
 * @param pluginList 插件列表
 * @param param 参数
 * @param key 高德地图的key
 */
export function initAMap(that, pluginList, param, key) {
    window._AMapSecurityConfig = {
        serviceHost: `http://127.0.0.1:8089/_AMapService`
    };
    const plugin = pluginList ? pluginList : defaultPlugin;
    AMapLoader.load({
        key: key ? key : "318d115b92dd7beb6e26260a2e208256",
        version: "2.0",
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        plugin: plugin,
    })
        .then((AMap) => {
        const params = param ? param : {
            // 设置地图容器id
            viewMode: "3D",
            zoom: 12,
            center: [111.397428, 23.90923], // 初始化地图中心点位置
        };
        const map = new AMap.Map("container", params);
        that.map = map;
    })
        .catch((e) => {
        console.log('加载失败：', e);
    });
}
/**
 * 销毁地图
 * @param map 高德地图容器对象
 */
export function destroy(map) {
    map?.destroy();
}
//# sourceMappingURL=amapUtils.js.map