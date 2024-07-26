import HomeBanner from "./Components/HomeBannerComponent";
import WinnersCarousel from "./Components/WinnersComponent";
import RecentLuckyDraws from "./Components/VideosSectionComponent";
import ProductsListComponent from "./Components/ProductsListComponent";

import  {winners}  from "../../Data";
import '../../css/App.css';
import InsightSection from "./Components/InsightSectionComponent";
import Footer from "../../Components/FooterCompnent";

const liveVideo = {
  url: 'https://www.youtube.com/embed/live_video',
  title: 'Live Video Title',
};

const videoChunks = [
  [
    { url: 'https://www.youtube.com/watch?v=ukhT2KLRsYw', title: 'Video 1' },
    { url: 'https://www.youtube.com/watch?v=ukhT2KLRsYw', title: 'Video 2' },
  ],
  [
    { url: 'https://www.youtube.com/embed/video3', title: 'Video 3' },
  ],
];

const mobileVideos = [
  { url: 'https://www.youtube.com/embed/video1', title: 'Video 1' },
  { url: 'https://www.youtube.com/embed/video2', title: 'Video 2' },
  { url: 'https://www.youtube.com/embed/video3', title: 'Video 3' },
];
function App() {
  return (
    <div className="App">
        <HomeBanner />
        <WinnersCarousel winners={winners} winnerPerSlide={3}/>
        <RecentLuckyDraws liveVideo={liveVideo} videoChunks={videoChunks} mobileVideos={mobileVideos} />
        <InsightSection/>
        <ProductsListComponent/>
        <Footer/>
    </div>
  );
}

export default App;
