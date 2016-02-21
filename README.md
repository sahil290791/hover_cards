# Hover Cards
## A plugin that enables hovercards

## How to use:
1.Add **hoverCard.min.css** to your page.
```html
<link rel="stylesheet" type="text/css" href="/path/to/hoverCard.min.css">
```
2.Then add **jQuery.min.js** and **hoverCard.min.js**.
```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script> 
<script src="/path/to/hoverCard.js"></script>
```
3.Add any class on the elements which needs to display hoverCards and then add **data-dev-id** attribute to the same tag which carries the id of the object whose detail needs to be shown in card.
```html
<!-- For example -->
<a class="hoverOn" data-dev-id="dev_1"></a>
```
4.Initialize the plugin:
```javascript
$('.hoverOn').hoverCards({
  url: 'https://getUserData/', //passing general url to which id stored in 'data-dev-id' can be appended
  backgroundColor: '#ddd', // to change the color of the card,
  fadeIn: 400, // fade in time in milliseconds
  fadeOut: 200, // fade out time in milliseconds
  delay: 1300 // triggers the hoverCard if user hovers for more than delay specified
});
```
5.The data returned from the url should be in json and in the following format only.
```javascript
{
  "name": "Joyce Ross",
  "role": "Web Developer, Zomato",
  "followers": "1k",
  "following": "890",
  "solved": "48",
  "about":"UI/Product Designer",
  "pic": "https://randomuser.me/api/portraits/med/women/31.jpg"
}
```
###Note:
If you want to change the format and card layout feel free to hack it.
##Preview
![alt hoverCard](images/demo.png "Logo Title HoverCard 1")

##Demo:
Click [here](http://sahil290791.github.io/hover_cards/demo.html) to see the demo.
