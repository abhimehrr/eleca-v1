import React from "react";

// Components
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ServiceDetails from '../partials/ServiceDetails'

export default function ServiceDetailsPage() {

  return (
    <>
      <Header />
      <div className="divider"></div>
      <main>
        <ServiceDetails/>
      </main>
      <Footer />
    </>
  );
}
