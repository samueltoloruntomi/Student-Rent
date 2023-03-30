import * as cheerio from "cheerio";
import fetch from "node-fetch";

const fetchHouseData = async () => {
    try {
      const response = await fetch(
        "https://www.zoopla.co.uk/to-rent/flats/eh10-5dt/?beds_min=0&price_frequency=per_month&price_max=1000&q=eh10%205dt&results_sort=newest_listings&search_source=to-rent"
      );
      const body = await response.text();
      const $ = cheerio.load(body);
  
      const items = [];
      $(".f0xnzq0 > .f0xnzq2").map((i, el) => {
        const price = $(el).find("._170k6632").text();
        const subPrice = $(el).find("._170k6633").text();
        const typeOfApartment = $(el).find("._1ankud51").text();
        const apartmentDescription = $(el).find("._1ankud52").text();
  
        const postedOn = $(el).find("._18cib8e1:first").text();
        const availability = $(el).find("._18cib8e1:last").text();
        const distance1 = $(el).find(".c4zxd03:first").text();
        const distance2 = $(el).find(".c4zxd03:last").text();
  
        //const photo = $(el).find('.splide__list .is-visible img').attr('src');
  
        items.push({
          typeOfApartment,
          apartmentDescription,
          price,
          subPrice,
          postedOn,
          availability,
          distance1,
          distance2,
        });
      });
      console.log(items)
      return items;
    } catch (error) {
      console.log(error);
    }
  }
  
fetchHouseData()
