declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';
declare module 'lunar-calendar' {
  export function solarToLunar(
    year: number,
    month: number,
    day: number,
  ): {
    lunarMonthName: string;
    lunarDayName: string;
  };
}
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
  | 'site'
  | undefined;

// 高德地图class属性
declare let AMap: {
  Map: new (ele: string | HTMLElement, option?: object) => void;
  GeoJSON: new (option?: object) => void;
  Polygon: new (option: object) => {
    getPath: () => {
      map: (item: any) => void;
    };
    setPath: (arr: any[]) => void;
  };
  Autocomplete: new (option: object) => void;
  PlaceSearch: new (option: object) => any;
  AutoComplete: new (option: any) => void;
  DistrictSearch: new (option?: object) => {
    search: (str: string, callback: (status: any, result: any) => void) => void;
  };
  Marker: new (option?: any) => {
    content: string;
    dom: any;
    on: (event: any, callback: (...args: any[]) => void) => void;
    setMap: (map: any) => void;
    setTitle: (content: string) => void;
    setLabel: ({ content, offset, direction }?: any) => void;
    getPosition: () => void;
    moveAlong: (arrMark: any[], option: any) => void;
  };
  Polyline: new (option?: any) => {
    setPath: (path: any) => void;
  };
  InfoWindow: new (option: any) => {
    setContent: (data: any) => void;
    open: (map: any, coord: any) => void;
  };
  Pixel: new (num1: any, num2: any) => void;
  Object3DLayer: new (option?: any) => any;
  Icon: new (option?: any) => any;
  Size: new (num1: any, num2: any) => void;
  PolyEditor: new (map: any, option: any) => void;
  MouseTool: new (map: any, option?: any) => {
    polygon: (options: any) => void; // 开启
    close: () => void; // 关闭
    on: (type: string, callback: (e: any) => void) => void;
    getPath: () => void;
  };
  LngLat: new (num1: number, num2: number, flag: boolean) => void;
  MarkerCluster: new (map: any, points: any, options: object) => void;
  CircleMarker: new (options: object) => {
    setMap: (map: any) => void;
    on: (event: string, fun: (e: any) => object) => void;
  };
  service: (str: string, callback?: any) => object;
  plugin: (arr: any[], fn: any) => void;
  convertFrom: (
    coord: any[],
    type: string,
    callback: (status: any, result: any) => void,
  ) => void;
  moveCamera: (option: any) => void;
  animateCamera: (option: any) => void;
  GeometryUtil: {
    ringArea: (num: number) => number;
  };
  event: {
    addListener: (param: any, classes: string, str: any) => any;
  };
  TileLayer: {
    RoadNet: new (option?: any) => void;
    Satellite: new (option?: any) => void;
  };
  Object3D: {
    Wall: new (option: any) => any;
  };
};

// 百度地图class属性
declare let BMapGL: {
  Map: new (ele: string | HTMLElement, option?: object) => void;
};

declare namespace API {
  interface PageInfo {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Record<string, any>[];
  }

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  // 接口请求返回结果
  interface Result_string_ {
    code?: number;
    msg?: string;
    data?: string | any[] | Record<string, any>;
  }

  type UserGenderEnum = 'MALE' | 'FEMALE';

  // 用户信息参数
  interface UserInfoVO {
    name?: string;
    nickName?: string;
    email?: string;
  }
}
