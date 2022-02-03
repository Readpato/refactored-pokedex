# Pokedex

## Description

Learn more about Pokemon with the -refactored- Pokedex!

Demo: <a href="">Pokedex</a>

### Technologies Used

For this project the technologies and tools used were:

- Vanilla JavaScript
- Bootstrap
- CSS
- SASS
- HTML
- NPM
- Cypress

Authors note: As this project was intended to refactor the JavaScript code, the UI is not so good and do not represent the way I normally handle UI in personal projects.

#

## Installation

As this project runs with Bootstrap and Cypress you will have to have NPM or anything similar and then run this little code snippet on the CLI.

```
npm install
```

This will allow to download the dependencies you need to run the Pokedex properly.

#

## Utilization

The Pokedex is pretty simple to use. Once the main page is loaded, the user will have right at his disposition:

- A navigation bar that has the title and a search bar.
- A list of twenty Pokemon names available for choosing.
- A paginator that allows the user to cycle between Pokemon lists.

<img  src="" align="center">

The navigation bar has two functionalities with its available elements:

- When the logo is clicked, it will allow the user to jump back to the homepage of the Pokedex.

- The search bar allows the user to search by name for a specified Pokemon and it will get in return a card showing a description from that Pokemon.

<img  src="" align="center">

To the right of the page, a list of Pokemon will appear. If the user clicks on top of it, it will show a card depicting some information about the selected Pokemon. A small animation will show the user which Pokemon it has selected.

<img  src="" align="center">

At the bottom of the page, the user may choose to skip to the next or previous page or even to select a page that he/she wishes to go to. This will show new Pokemon to select from the list.

<img  src="" align="center">

When using the search bar, should the user insert in the input:

- An invalid character.
- A Pokemon name that exceeds 30 characters.
- A Pokemon name that doesn't exist.

A custom Pokemon card will appear displaying the silhouette of a Pokemon (Who's that Pokemon?) and a short description of the error that has occured.

<img src="" align="center">

#

## Challenges Faced

- Using a RESTful API to bring content to the page.

- Working with fetch API and asynchronous code.

- Creating a Paginator

- Conditional Testing with Cypress.

#

## What I learned

- How to not overwhelm an API. The first Pokedex I created send too much requests to the API and it's better not to do that. Now, with the Paginator and also a list of Pokemon, it allows the user to just create one request at the time.

- How to create a Paginator! It wasn't easy, and I'll still need to wrap my mind around it more, but I learned many new things on how to write code!

- How to correctly fetch a RESTful API content. I can see why the architecture of an API is really important. Once the resources that the API uses were clear for me, the fetching of its results was pretty straightforward.

- You can test almost everything with Cypress. It's amazing how it's also really intuitive to use. With this project I kept consolidating my knowledge of conditional testing aswell.

- As this project was mostly constructed with Bootstrap, I refreshed my knowledge about Flexbox, which in this case it's assigned by adding predefined Bootstrap classes to the HTML elements.

#

## Support

If some error should appear, you can contact me through:

- Twitter: @patoraedler
- Email: patoraedler@gmail.com

#

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate :)

#

## Author

Patrick Raedler.

#
