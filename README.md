# Philly Bikeshare Station Finder 

[http://www.stacygrimes.com/phillyBikeShare/](http://www.stacygrimes.com/phillyBikeShare/) (Hosted on a Linode server)

## Summary:

This app was created per instructions and requirements from [the P'unk Avenue frontend challenge](https://github.com/punkave/frontend-challenge).

This app allows a user to input an address or an intersection to see the closest [Indego](https://www.rideindego.com/) bikeshare stations.<br>
A user can click on a map cycle marker to display an info-window that shows the:
* name of the station 
* address of station 
* number of bikes currently available 
* number of open docks currently available 

Additionally this app has been integrated with the [OpenWeatherMap API](https://openweathermap.org/current) to display the current temperature and weather conditions. If the current weather conditions threaten to create hazardous riding conditions, a red weather alert banner will become visible above the weather header. 

###### (*Checkboxes for "get a bike" and "return a bike" do not currently affect results.*)

*Search area and Weather header*<br>
<img src="https://github.com/livetodeliver/phillyBikeShare/blob/master/screenshots/screenshot2.png" width="600px" />

*Search area and Weather header w/ Weather Warning*
<img src="https://github.com/livetodeliver/phillyBikeShare/blob/master/screenshots/screenshot5.png" width="600px" />


### Technology Used: 
HTML/CSS/Vanilla Javascript 

Bash/Git, VSCode, Cyberduck, Postman, Chrome Devtools

### APIs and fun stuff:
[Indego GeoJSON](https://www.rideindego.com/stations/json/) (added to a Google Map as a data layer)<br>
[OpenWeatherMap API](https://openweathermap.org/current)<br>
[GoogleMaps API](https://developers.google.com/maps/documentation/javascript/tutorial)<br>
[GoogleMaps Geocoding Service](https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple)

## My process and thoughts on making this app

Here's a somewhat messy but [comprehensive GoogleDoc](https://docs.google.com/document/d/1TY8q1FNVJaJJC5F07c9-WBXRYBiPzkegPMcbskoElpw/edit?usp=sharing_) that outlines my planning for this app (including a rough mockup, user stories and user flows, checklist, etc). 

I had a lot of fun making this.  I learned quite a bit, hit some snags, did a lot of googling, reached out for help when needed and even did a little bit of pair programming with some trusted friends/mentors to get through some of the tougher obstacles. 

#### Possible Improvements and things I wish were just better
Though the app technically works and (I believe) meets all the specified requirements, when the user inputs an address the map will zoom to that location but I was not able to set the proper parameters to ensure that at least 3 stations will be displayed nearby. <br>
There's also a few of the "extra credit" features I wish I could have finished implementing such as getting the get-a-bike/return-a-bike filtering checkboxes working, adding a geolocation feature, having the marker color/style be based on bike/dock avaibility, and having both the weather and map details update in real time.  I do plan on trying to implement as many of those as possible even now that the challenge duration is technically over, and I will update this when that happens. 

I went over my code a lot to make sure it was consistent and had proper documentation but I am sure that it could be greatly improved with continued learning and practice with Javascript (YAY for learning and improving!).

Overall, I am both proud of and excited for what I was able to complete/accomplish/learn with this challenge, and am also definitely open to feedback on ways I could improve both my code and my process. :smile:

## Action Shots :zap:

<img src="https://github.com/livetodeliver/phillyBikeShare/blob/master/screenshots/screenshot3.png" alt="Screenshot of Philly Bikeshare App with search area and map" width="600px" />


<img src="https://github.com/livetodeliver/phillyBikeShare/blob/master/screenshots/screenshot4.png" alt="Screenshot of Philly Bikeshare App map section with markers and info window" width="600px" />

