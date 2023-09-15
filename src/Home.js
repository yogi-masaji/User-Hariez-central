import * as React from "react";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductValues from "./modules/views/ProductValues";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import ProductCTA from "./modules/views/ProductCTA";
import AppAppBar from "./modules/views/AppAppBar";
import withRoot from "./modules/withRoot";
import SearchBar from "./modules/views/SearchBar";
import FirstSection from "./modules/views/FirstSection";
import ServicesSection from "./modules/views/ServicesSection";
import Testimoni from "./modules/views/Testimoni";

function Home() {
    return (
        <React.Fragment>
            <AppAppBar />
            <FirstSection />
            <ServicesSection />
            <ProductValues />
            {/* <ProductCategories /> */}
            <ProductHowItWorks />
            <SearchBar />
            <Testimoni />
            <ProductCTA />
            <ProductSmokingHero />
            <AppFooter />
        </React.Fragment>
    );
}

export default withRoot(Home);
