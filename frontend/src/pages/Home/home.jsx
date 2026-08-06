import React,{useState} from 'react'
import './home.css'
import Header from '../../components/Header/header'
import Exploremenu from '../../components/ExploreMenu/exploremenu'
import FoodDisplay from '../../components/FoodDIsplay/fooddisplay.jsx'
import WhyUs from '../../components/WhyUs/WhyUs.jsx'
import AboutUs from '../../components/AboutUs/AboutUs.jsx'
import AppDownload from '../../Footer/AppDownload/AppDownload'

const Home = ({searchQuery}) => {

    const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <Exploremenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchQuery={searchQuery} />
      <WhyUs />
      <AboutUs />
      <AppDownload />
    </div>
  )
}

export default Home