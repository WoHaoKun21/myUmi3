import React, { useEffect } from 'react';
import FY from '../../../../public/static/data/fuyang.json';
import styles from './index.less';

let viewer: any; // cesium3D地图实例
// 初始化地图选项
const option = {
  sceneMode: Cesium.SceneMode.SCENE3D, // 地图模式
  animation: false, //是否显示动画控件
  homeButton: false, // 是否显示首页按钮
  geocoder: false, // 是否显示输入地名查找控件
  baseLayerPicker: true, // 是否显示选择地形影像等的控件
  timeline: false, // 是否显示时间线控件
  fullscreenButton: false, // 是否全屏显示
  scene3DOnly: true, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
  infoBox: false, // 是否显示点击要素之后显示的信息
  sceneModePicker: true, // 是否显示投影方式控件（包含二维及三维投影）
  navigationHelpButton: false, // 是否显示帮助控件
  creditDisplay: false, // 是否显示版权信息
  selectionIndicator: false, // 是否显示选取指示器组件
  imageryProvider: true, // 是否显示影像
  orderIndependentTranslucency: false, // 去掉大气层黑圈
  skyAtmosphere: false, // 去掉大气层
  contextOptions: { webgl: { alpha: true } }, // 天空背景为纯色的前提
};

const CesiumCity: React.FC = () => {
  // 初始化cesium3D地图
  const initMap = () => {
    const cesiumDom = document.getElementById('cesiumDom')!;
    // 默认定位到中国，参数依次为东西南北
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
      75.0,
      0.0,
      140.0,
      60.0,
    );
    viewer = new Cesium.Viewer(cesiumDom, option); // 初始化地图
    // 跳转视角到指定城市
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        119.83955383300781,
        30.00194549560547,
        140000,
      ),
      // orientation: {
      //   pitch: Cesium.Math.toRadians(-20),
      // },
    });
    // 动态隐藏星星
    const scene = viewer.scene; // 获取场景：天空、太阳、月亮。。。。
    scene.skyBox.show = false; // 关闭天空
    scene.sun.show = false; // 关闭太阳光
    scene.backgroundColor = Cesium.Color.fromCssColorString('#00000000'); // 背景色
    console.log('天空数据：', scene);

    // 城市裁剪
    clippingCity(FY);
    // 为裁剪区域填充高度
    addCityAreaHeight(FY, -1600);
    // 地图点击事件
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((event) => {
      let mapPosition = {};
      const pick1 = viewer.scene.pickPosition(event.position);
      const pick2 = viewer.scene.camera.pickEllipsoid(event.position);
      const ray = viewer.camera.getPickRay(event.position);
      const pick3 = viewer.scene.globe.pick(ray, viewer.scene);
      // 是否都获得了有效值
      if (
        Cesium.defined(pick1) &&
        Cesium.defined(pick2) &&
        Cesium.defined(pick3)
      ) {
        const pickArray = [pick1, pick2, pick3];
        pickArray.forEach((item) => {
          // 笛卡尔坐标系转为经纬度（弧度）坐标
          const cartographic = Cesium.Cartographic.fromCartesian(item);
          // 再将经纬度（弧度）坐标转化为经纬度角度坐标
          const lat = Cesium.Math.toDegrees(cartographic.latitude);
          const lng = Cesium.Math.toDegrees(cartographic.longitude);
          mapPosition = {
            x: lng,
            y: lat,
            z: cartographic.height,
          };
          console.log('鼠标点击的点坐标：', mapPosition);
        });
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  };

  // 裁剪城市
  const clippingCity = (geojson: any) => {
    // 1、创建边界数据存储变量
    const arr: any[] = [];
    // 2、解析geojson数据，将边界数据添加到数组
    geojson.features[0].geometry.coordinates[0][0].forEach((o: any[]) => {
      arr.push(o[0]), arr.push(o[1]);
    });
    // 3、将地理坐标（经度和纬度）转换为三维空间中的笛卡尔坐标
    const positions = Cesium.Cartesian3.fromDegreesArray(arr);
    // 4、对地图进行裁剪，只会展示裁剪后的区域
    const clippingPolygons = new Cesium.ClippingPolygonCollection({
      polygons: [new Cesium.ClippingPolygon({ positions, heihgt: 500 })],
    });
    // 5、是否反选裁剪多边形
    clippingPolygons.inverse = true;

    // 6、获取当前的裁剪多边形集合并展示在地图上
    viewer.scene.globe.clippingPolygons = clippingPolygons;
  };

  // 添加边界高度
  const addCityAreaHeight = (geojson: any, heihgt: number) => {
    // 1、创建边界数据存储变量
    const arr: any[] = [];
    // 2、解析geojson数据，将边界数据添加到数组
    geojson.features[0].geometry.coordinates[0][0].forEach((o: any) => {
      arr.push(o[0]), arr.push(o[1]);
    });

    // 创建边界多边形
    const polygonWithHole = new Cesium.PolygonGeometry({
      polygonHierarchy: new Cesium.PolygonHierarchy(
        Cesium.Cartesian3.fromDegreesArray(arr),
        [new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArray(arr))],
      ),
      heihgt,
      extrudedHeight: heihgt,
    });

    // 将创建的多边形添加到场景中
    const geometry = Cesium.PolygonGeometry.createGeometry(polygonWithHole);

    // 几何体实例在场景中的具体信息
    const instances = [
      new Cesium.GeometryInstance({
        geometry: geometry,
        // attributes: {
        //   color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        //     Cesium.Color.fromCssColorString('rgba(249, 227, 124, 1)'),
        //   ),
        // },
      }),
    ];

    // 自定义着色器材质
    const customMaterial = new Cesium.Material({
      fabric: {
        type: 'Custom',
        uniforms: {
          minHeight: 0,
          midHeight: 25000,
          maxHeight: 50000,
          startColor: new Cesium.Color(1.0, 0.0, 0.0, 1.0), // 起始颜色（红色）
          midColor: new Cesium.Color(0.0, 1.0, 0.0, 1.0), // 中间颜色（绿色）
          endColor: new Cesium.Color(0.0, 0.0, 1.0, 1.0), // 结束颜色（蓝色）
        },
      },
    });

    console.log('材质：', Cesium.Material);

    // 创建一个Primitive实例用来存储多边形
    const primitive = new Cesium.Primitive({
      geometryInstances: instances, // 用于定义要渲染的几何实例列表。
      //  用于为每个几何体实例指定单独的颜色，以便在场景中呈现不同颜色的几何体。
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        translucent: false,
      }),
      material: customMaterial, // 自定义材质
    });
    // 将实例对象展示在场景中
    viewer.scene.primitives.add(primitive);
  };

  useEffect(() => {
    initMap();
    return () => {
      viewer?.destroy(); // 销毁地图
    };
  }, []);

  return (
    <div className={styles.container}>
      <div id="cesiumDom"></div>
    </div>
  );
};

export default CesiumCity;
