import ItemPage from './component/itemPage';
import ItemOne from './component/itemOne';
import ItemTwo from './component/itemTwo';
import ItemThree from './component/itemThree';
import ItemFour from './component/itemFour';
import MapPage from './component/mapPage';
import './index.less';
const HomePage = () => {
  return (
    <div>
      <section className="container">
        <section className="itemLeft">
          <ItemPage>
            <ItemOne />
          </ItemPage>
          <ItemPage>
            <ItemTwo />
          </ItemPage>
        </section>
        <section className="itemCenter">
          <MapPage />
        </section>
        <section className="itemRight">
          <ItemPage>
            <ItemThree />
          </ItemPage>
          <ItemPage>
            <ItemFour />
          </ItemPage>
        </section>
      </section>
    </div>
  );
};
export default HomePage;
