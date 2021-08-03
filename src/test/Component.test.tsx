import { fireEvent, getAllByText, getByTestId, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

import axios from 'axios';
import * as rcookies from 'react-cookie';
import {BrowserRouter, Route} from "react-router-dom";

import validate from "../components/FormValidation";


import {testPortfolioList, fullPortfolioTestObj,  testGeneralUser, testAdminFname} from "./TestUserComponent";
import PortfolioList from "../components/PortfolioList";
import HonorAwards from "../components/HonorAward";
import Adminpage from "../components/Adminpage";

import ViewPortfolio from "../components/ViewPortfolio/ViewPortfolio";

var pIndex = 0;
beforeAll(async () => {
    const axios = require('axios');
})

jest.mock('react-cookie', () => ({
    useCookies: jest.fn()
}));

jest.mock('axios');


afterEach(() => {
    jest.resetAllMocks();
})



//test LoginValidation

//portfolioList
describe('Test PortfolioList', () => {
    it('checks if portfolio table show up in the portfolio list', async () => {

        const getCookie = jest.spyOn(rcookies, 'useCookies').mockImplementation(() => {
            return [{
                id: 2,
                user: testGeneralUser,
                portfolio: testPortfolioList[pIndex]
            }, function () {
                console.log('updateCookie function called.')
            }, function () {
                console.log('removeCookie function called.')
            }];
        })

        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: testPortfolioList});
        })
        const { getByText } = render(<PortfolioList />);
        const title = getByText("List of Portfolios");
        expect(await screen.findByText("List of Portfolios")).toBeVisible();
        expect(title).toHaveTextContent("List of Portfolios");
        expect(title).not.toHaveTextContent("About me");

        await waitFor(() => {
            const name = getByText("DevOps Engineer");
            expect(name).toHaveTextContent("DevOps Engineer");
            expect(name).not.toHaveTextContent("I Don't Have This Text");
            expect(name).toBeVisible();
        })

    })
})

//test HonorAward
describe(`Testing HonorAward.tsx`, () => {
    it(`checks if honors are being displayed from the axios get call`, async () => {

        const getCookie = jest.spyOn(rcookies, 'useCookies').mockImplementation(() => {
            return [{
                id: 2,
                user: testGeneralUser,
                portfolio: testPortfolioList[pIndex]
            }, function () {
                console.log('updateCookie function called.')
            }, function () {
                console.log('removeCookie function called.')
            }];
        })

        const axios = require('axios');
        axios.get.mockImplementationOnce((longUrl: string)  => {
            return Promise.resolve({data: fullPortfolioTestObj.honor});
        })
        const { getByText } = render(<HonorAwards />);
        const title = getByText("Honors & Awards");
        expect(await screen.findByText("Honors & Awards")).toBeVisible();
        expect(title).toHaveTextContent("Honors & Awards");
        expect(title).not.toHaveTextContent("About me");

        await waitFor(() => {
            const desc = getByText("Super hero that kinda helped save the world.");
            expect(desc).toHaveTextContent("Super hero that kinda helped save the world.");
            expect(desc).not.toHaveTextContent("I Don't Have This Text");
            expect(desc).toBeVisible();
        })
    })
})

//AdminPage
describe(`test admin page cookie functionality`, () => {
    it(`makes sure the admin name displays from the cookie`, () => {

        const getCookie = jest.spyOn(rcookies, 'useCookies').mockImplementation(() => {
            return [{
                id: 2,
                admin: testAdminFname,
                portfolio: testPortfolioList[pIndex]
            }, function () {
                console.log('updateCookie function called.')
            }, function () {
                console.log('removeCookie function called.')
            }];
        })

        const {getByText} = render(<Adminpage />);
        const adminWelcome = getByText(`Welcome Back, John Doe`);
        expect(adminWelcome).toHaveTextContent(`Welcome Back, John Doe`);

    })
})



//Test Flagging on View Portfolio
describe(`test ViewPortfolio`, () => {
    it(`Test that only admins can view another user's portfolio`, () => {

        const getCookie = jest.spyOn(rcookies, 'useCookies').mockImplementation(() => {
            return [{
                id: 2,
                user: testGeneralUser,
                portfolio: testPortfolioList[pIndex]
            }, function () {
                console.log('updateCookie function called.')
            }, function () {
                console.log('removeCookie function called.')
            }];
        })

        let {getByText} = render(<BrowserRouter><Route path="/view" component={ViewPortfolio} /></BrowserRouter>);
        const adminWelcome = screen.queryByText(`Portfolio Name:`);
        expect(adminWelcome).toBeNull();

    })

})


//AccountLogin


//test form validation
describe('Test FormValidation', () => {
    it('makes sure first name cannot be blank', () => {
        const test = {fname:'First Name cannot be left blank'}

        expect(validate({fname:"", lname:'lastName', email:'test@mail.com', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check last name validation', () => {
        const test = {lname:'Last Name connot be left blank'}

        expect(validate({fname:"firstName", lname:'', email:'test@mail.com', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check email not blank', () => {
        const test = {email:'Email connot be left blank'}

        expect(validate({fname:"FirstName", lname:'lastName', email:'', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check email is valid', () => {
        const test = {email:'Please enter a vailed email address'}

        expect(validate({fname:"firstname", lname:'lastName', email:'testmailcom', password:'password', confirmPassword:'password'})).toEqual(test);
    })
    it('check password not blank', () => {
        const test = {password:'Password cannot be left blank'}

        expect(validate({fname:"firstname", lname:'lastName', email:'test@mail.com', password:'', confirmPassword:'password'})).toEqual(test);
    })
    it('check password length', () => {
        const test = {password:'Password must be at least 8 characters long'}

        expect(validate({fname:"FirstName", lname:'lastName', email:'test@mail.com', password:'pass', confirmPassword:'password'})).toEqual(test);
    })
    it('check password confirmation', () => {
        const test = {confirmPassword:'Passwords must match'}

        expect(validate({fname:"firstname", lname:'lastName', email:'test@mail.com', password:'password', confirmPassword:'pword'})).toEqual(test);
    })
    
})




