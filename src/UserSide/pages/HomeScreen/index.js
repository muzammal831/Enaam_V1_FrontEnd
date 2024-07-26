import HomeBanner from "./Components/HomeBannerComponent";
import WinnersCarousel from "./Components/WinnersComponent";
import RecentLuckyDraws from "./Components/VideosSectionComponent";
import ProductsListComponent from "./Components/ProductsListComponent";

import '../../css/App.css';
import InsightSection from "./Components/InsightSectionComponent";
import Footer from "../../Components/FooterCompnent";

function App() {
  return (
    <div className="App">
        <HomeBanner />
        <WinnersCarousel/>
        <RecentLuckyDraws/>
        <InsightSection/>
        <ProductsListComponent/>
        <Footer/>
    </div>
  );
}

export default App;
