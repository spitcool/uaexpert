// ==UserScript==
// @name         UnitedExpertMode
// @namespace    http://tampermonkey.net/
// @version      8.0
// @description  Will highlight specified fare buckets on united.com assuming Expert Mode is enabled.
// @author       Christopher Spitler
// @match        https://www.united.com/en/us/fsr/choose-flight*
// @match        https://www.united.com/en/us/book-flight/united-reservations*
// @match        https://www.united.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=united.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function wholeProcess(){

        function dateButtonBind(){
            // Since the page is built in React it is hard to detect changes like we used to. For this script, we will
            // use specific triggers on the flight search results page.
            //
            // The Fare Wheel shows the 3 preceeding days and 3 following dates from the search date. Clicking on
            // one of these days will cause the script to re-initiate.
            //
            let str = '//div[@class="app-components-Shopping-FareWheel-styles__fareWheelContainer--1-Nim"]//button'
            let buttonNodes = document.evaluate( str, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
            let btn, btns = [];
            while ((btn = buttonNodes.iterateNext())) {
                btns.push(btn)
            }
            // If you want to change the city pair or the initial search date from the flight search results screen, this will detect that
            // and run the script again when the page reloads.
            //
            let updateBtn = document.evaluate( '//button[span/text()="Update"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE ).singleNodeValue
            btns.push(updateBtn)

            btns.forEach(v=>{v.addEventListener("click", ()=>{
                //alert("ok");
                wholeProcess();
            })})

        }

        function processPage(){

            // Now, let's expand each of the Details sections to expose the fare buckets.

            let rootDiv = document.evaluate( '//div[@id="flightResults-content"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE ).singleNodeValue;
            let buttonNodes = document.evaluate('//button/span[text()="Details"]', rootDiv,null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
            let btn, btns = [];
            while ((btn = buttonNodes.iterateNext())) {
                btns.push(btn)
            }
            btns.forEach(v=>v.click())

            // Here we specify the fare buckets we want to search for. PN is GS Upgrades, PZ is 1K/Plat upgrades, and T is XN conversion.

            let xpathStr = '//ul[@class="app-components-Shopping-FlightDetailCard-styles__fareClasses--34jgR"]/li[starts-with(text(), "PN") or starts-with(text(), "PZ") or starts-with(text(), "T") ]'

            let liNodes = document.evaluate(xpathStr, rootDiv,null, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
            let li, lis = [];
            while ((li = liNodes.iterateNext())) {
                lis.push(li)
            }
            // Let's color available inventory GREEN and color zeroed inventory RED. Text size set to 150% so it's easier to see as you fast scroll.
            lis.forEach(v=>{
                if(v.firstChild.textContent.endsWith('0')){
                    v.setAttribute("style","color:red;font-size:150%")
                }else{
                    v.setAttribute("style","color:green;font-size:150%")
                }
            })

            dateButtonBind();

        }

        //setTimeout(()=>{main();},waitTime)

        let detailsBtnInterval = setInterval(()=>{
            console.log('check Details availability')
            let detailsBtn = document.evaluate( '//div[@id="flightResults-content"]//button/span[text()="Details"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE ).singleNodeValue;
            if(detailsBtn != null){
                clearInterval(detailsBtnInterval)
                setTimeout(()=>{
                    console.log('process the page')
                    processPage()
                },1000)
            }
        },1000)

        }

    wholeProcess()


})();
