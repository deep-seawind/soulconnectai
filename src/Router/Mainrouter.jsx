import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "../Components/Pages/Home/Home";
import NotFound from "../Components/common/NotFound"; 
import BestMatches from "../Components/Pages/BestMatches/BestMatches";
import ProfileDetails from "../Components/Pages/BestMatches/ProfileDetails";
import ScrollToTop from "../Components/common/ScrollToTop";
import VerificationStatus from "../Components/Pages/Forms/verification/VerificationStatus";

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
           <Route path="/verification-status" element={<VerificationStatus />} />
 
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
};

export default Mainrouter;
