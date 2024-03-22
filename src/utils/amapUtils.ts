import AMapLoader from '@amap/amap-jsapi-loader';


const defaultPlugin: Array<string> = [
    'AMap.Autocomplete', // 输入提示插件
    'AMap.PlaceSearch', // POI搜索插件
    'AMap.Scale', // 右下角缩略图插件 比例尺
    'AMap.OverView', // 地图鹰眼插件
    'AMap.ToolBar', // 地图工具条
    'AMap.Geolocation', // 定位控件，用来获取和展示用户主机所在的经纬度位置
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
export function initAMap(that: any, pluginList: Array<string>, param: object, key: string): any
{
    window._AMapSecurityConfig = {
        serviceHost: `http://127.0.0.1:8089/_AMapService`
    }
    const plugin = pluginList ? pluginList : defaultPlugin
    AMapLoader.load({
        key: key ? key : "318d115b92dd7beb6e26260a2e208256", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        plugin: plugin,
    })
        .then((AMap: any) =>
        {
            const params = param ? param : {
                // 设置地图容器id
                viewMode: "3D", // 是否为3D地图模式
                zoom: 12, // 初始化地图级别
                center: [111.397428, 23.90923], // 初始化地图中心点位置
            }
            const map = new AMap.Map("container", params);
            that.map = map;
        })
        .catch((e: Error) =>
        {
            console.log('加载失败：', e);
        });
}

/**
 * 销毁地图
 * @param map 高德地图容器对象
 */
export function destroy(map: any): void
{
    map?.destroy();
}
