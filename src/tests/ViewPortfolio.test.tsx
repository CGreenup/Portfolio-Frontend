import { render } from "@testing-library/react";
import '@testing-library/jest-dom';

import {url} from "../api/api";

import {AdminUserTestComponent, GeneralUserTestComponent} from "./TestUserComponent";

// Import Portfolio component viewers
import AboutMeView from "../components/ViewPortfolio/AboutMeView";
import CertificationView from "../components/ViewPortfolio/CertificationView";
import EducationView from "../components/ViewPortfolio/EducationView";
import HonorAwardView from "../components/ViewPortfolio/HonorAwardView";
import IndustryEquivalencyView from '../components/ViewPortfolio/IndustryEquivalencyView';
import OtherWorkExperienceView from "../components/ViewPortfolio/OtherWorkExperienceView";
import ProjectView from "../components/ViewPortfolio/ProjectView";
import RevatureWorkExperienceView from "../components/ViewPortfolio/RevatureWorkExperienceView";
import ViewPortfolio from "../components/ViewPortfolio/ViewPortfolio";




beforeAll(async () => {
    <AdminUserTestComponent/>;
})

// describe test AboutMeView

// describe test CertificationView

// describe test EducationView

// describe test HonorAwardView

// describe test IndustryEquivalencyView

// describe test OtherWorkExperienceView

// describe test ProjectView

// describe test RevatureWorkExperienceView

// describe test ViewPortfolio
describe('Test Admin functionality on viewing Portfolio', () => {
    

    it('Check if IndustryEquivalencyView component is visible.', () => {
        

        render(<IndustryEquivalencyView />);
        expect("Industry Equivalency").toBeVisible();

    })
})