import { useEffect } from 'react';

interface IBdMapProps {}

let map: any;

const BdMap: React.FC<IBdMapProps> = () => {
  const initMap = () => {
    //地图加载
    map = new AMap.Map('container', {
      resizeEnable: true,
    });
    //输入提示
    const autoOptions = {
      input: 'tipinput',
    };
    const auto = new AMap.Autocomplete(autoOptions);
    // 点击地区后的操作
    const placeSearch = new AMap.PlaceSearch({
      map: map,
    }); //构造地点查询类
    AMap.event.addListener(auto, 'select', select); //注册监听，当选中某条记录时会触发
    function select(e: any) {
      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name); //关键字查询查询
    }
  };

  useEffect(() => {
    initMap();
    // initMapTwo()
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div
        id="container"
        style={{
          width: 1000,
          height: 800,
          border: '1px solid #f00',
          margin: '10px auto',
        }}
        // style={{
        //   position: 'fixed',
        //   top: 0,
        //   left: 0,
        //   width: '100%',
        //   height: '100%',
        //   zIndex: '9999',
        // }}
      />
      <div className="input-item">
        <div className="input-item-prepend">
          <span className="input-item-text" style={{ width: '8rem' }}>
            请输入关键字
          </span>
        </div>
        <input id="tipinput" type="text" />
      </div>
    </div>
  );
};

export default BdMap;
