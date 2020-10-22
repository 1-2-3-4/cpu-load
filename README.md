# CPU Load Average

## Front-end

To start up the build from root `cd app && npm i && npm start`, go to `http://localhost:8000/`.

To run tests `npm test`.

### Additional Considerations

In order to extend this project, some additional considerations:

- e2e/integration tests
- customize webpack, test coverage, and other configs, rather than bootstrapping with `create-react-app`
- if data visualization needs to be updated every 10 seconds, find more performant solution for charting (for example VictoryAxis seems to lag a bit in the Load History section)
- consider hover effects over the area chart in Load History in order to see more granular data
- consider a gradient or another design solution for Load History to make differences in CPU load threshholds easily apparent
- consider data visulization for the Heavy Load and Recovery section
- if data was persisted, allow user to adjust time frames. use timestamps rather than relating to the ten minute recent time window.
- address a11y concerns
- autoprefixing for CSS
- centralized css vars for colors, etc
- consider alternate method for styling (i.e. css modules or styled components)
- design system component folder or library for base components (text, button, link, cards etc) to maintain design consistency
- factories for generating data in specs
- separate repos for front-end and back-end. implement continuous integration
- linting
- error handling. currently assuming a "happy path"

### Assumptions

Some assumptions made by this project:

- this is a desktop application
- for simplicity max CPU is referred to as 1 or 100% in the code

## Back-end

To start up the server from root `cd api && npm i && npm start`.

This project was boot-strapped using the `express-generator` package

### Additional Considerations

Some high level additional considerations that would aid with the front-end application:

- add specs
- persist data
- caching layer
- add timeframe param to the current endpoint
