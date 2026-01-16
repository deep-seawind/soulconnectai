import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "../Components/Pages/Home/Home";
import NotFound from "../Components/common/NotFound";
import BasicInfo from "../Components/Pages/forms/basic-info/BasicInfo";
import Education from "../Components/Pages/Forms/education/Education";
import BestMatches from "../Components/Pages/BestMatches/BestMatches";
import ProfileDetails from "../Components/Pages/BestMatches/ProfileDetails";
import ScrollToTop from "../Components/common/ScrollToTop";

const Mainrouter = () => {
  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        {/* <GoogleTranslate/>
        <BottomToTopButton /> */}
        {/* <Header /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/best-matches" element={<BestMatches />} />
          <Route path="/profile-details" element={<ProfileDetails />} />
 
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default Mainrouter;
