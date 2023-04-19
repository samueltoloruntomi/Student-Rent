import fetch from 'node-fetch';
import * as cheerio from "cheerio";


// web crawling class
class ScrapeZoopla {

    // function to scrape the house
    static async getSearchedZooplaHouses(req, res) {
        try {

            const { postalCode } = req.params;
            
            const url = `https://www.zoopla.co.uk/to-rent/property/edinburgh-county/?price_frequency=per_month&q=${postalCode}&search_source=home&keywords=student`; // website URL

            const response = await fetch(url); // return url response
            const html = await response.text();
            const $ = cheerio.load(html);
            const items = []; // 
        
            // looping through the HTML code structure
            $(".f0xnzq0 > .f0xnzq2").map((i, el) => {
                const item = {};
                item.title = $(el).find("._1ankud51").text().trim(); // getting the title text
                item.address = $(el).find("._1ankud52").text().trim(); // getting the address text
                item.description = $(el).find("._1ankud53").text(); // getting the description text
                item.availability = $(el).find("._18cib8e1:last").text(); // getting the full information about the room.
                item.rooms = $(el).find('._1ankud51').text().split(' ').slice(0, 2).join(' '); // getting the number of rooms text
                item.link = $(el).find('._1maljyt1').attr().href; // getting the link to view a room
                item.price = $(el).find("._170k6632").text() // getting the price text
                item.thumbnail = $(el).find('.fjzuu02 .splide__list .is-active picture img').attr("src") //getting the image
          
                items.push(item);
              });

            if(items.length > 0) {
                return res.json({
                    data: items
                })
            }
            else {
                return res.json({
                    data: []
                })
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }

// to recommend close alternatice to users if search query is not found in database of 50items scrapped, it goes back to source websites to run the query to make recommendation
    static async getAltSearchedZooplaHouses(req, res) {
        try {

            const { postalCode, minPrice, maxPrice, minBedroom, maxBedroom } = req.params;
            

            const url = `https://www.zoopla.co.uk/to-rent/property/edinburgh/?beds_max=${maxBedroom}&beds_min=${minBedroom}&keywords=student&price_frequency=per_month&price_max=${maxPrice}&price_min=${minPrice}&q=${postalCode}&results_sort=newest_listings&search_source=to-rent`

            const response = await fetch(url); // return url response
            const html = await response.text();
            const $ = cheerio.load(html);
            const items = []; // 
        
            // looping through the HTML code structure
            $(".f0xnzq0 > .f0xnzq2").map((i, el) => {
                const item = {};
                item.title = $(el).find("._1ankud51").text().trim(); // getting the title text
                item.address = $(el).find("._1ankud52").text().trim(); // getting the address text
                item.description = $(el).find("._1ankud53").text(); // getting the description text
                item.availability = $(el).find("._18cib8e1:last").text(); // getting the full information about the room.
                item.rooms = $(el).find('._1ankud51').text().split(' ').slice(0, 2).join(' '); // getting the number of rooms text
                item.link = $(el).find('._1maljyt1').attr().href; // getting the link to view a room
                item.price = $(el).find("._170k6632").text() // getting the price text
                item.thumbnail = $(el).find('.fjzuu02 .splide__list .is-active picture img').attr("src") //getting the image
          
                items.push(item);
              });

            if(items.length > 0) {
                return res.json({
                    data: items
                })
            }
            else {
                return res.json({
                    data: []
                })
            }
            
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default ScrapeZoopla;
