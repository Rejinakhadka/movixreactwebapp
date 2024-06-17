import React from "react";
import { useState } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");  //initially day ma huncha data
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);//trending ko lagi

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };   //API call for day and week

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading}/>  
    </div>
  );
};

export default Trending;
