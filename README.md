please provide a README that outlines the structure of your application and technologies used, the reasoning behind your technical choices, and any trade-offs you made or changes you would have implemented had you had additional time.


# Frontend Evaluation

Hey folks! Thanks for taking the time to look at my code! I wrote this basic sudoku game in Javascript, using jQuery and Underscore.js. The game is played by selecting a number (or the eraser) on the right-hand panel and choosing a square to place it in.


### Design Decisions

At the highest level, my code is separated into four parts, each contained in its own file. The `index.html` file contains all of the DOM elements and references to the necessary scripts and stylesheets. I considered building up the DOM using jQuery, but decided that since the visual structure of the game is static, it made more sense to include the elements, both for a faster page load and for a general separation of concerns. I used `<li>`s to represent the squares on the board and gave them IDs corresponding to their coordinates on the board. I saw this as a way to easily differentiate the squares while also making the interface between the representational logic and the DOM more intuitive.

For this project, I decided to use jQuery for DOM manipulation. I used Underscore.js for its enumerative methods, as I used a 2D array to represent the internal state of the sudoku board. I believe Underscore makes the code more legible and avoids the proliferation of `for` loops throughout the code.

The code in the `script.js` file follows a modular namespacing pattern. Though this project only contains one file with of game logic, it would be easy to add other files that all shared the same namespace using this pattern. Obviously, there are a lot of features that could have been implemented here. A few that I would have liked to add given more time are as follows:

1. The ability to let users turn off the blocking of incorrect number placements. This would have naturally led to other possible and/or necessary changes:
     1. A more interesting check for whether the user has won.
     2. The possibility for code that shows conflicts on the board.

I reserved all of the DOM interactive, jQuery-heavy, code for the `event_binding.js` file. It includes a function to build up a given initial board setup and event handlers for selecting and placing numbers.

Lastly, I decided on a minimalist approach for styling and borrowed from Uber's color scheme. 


#### Thanks!

I'm sure you folks at Uber are pretty busy these days, thanks again for taking a minute to consider my work. I'm looking forward to hearing from you soon.


<!-- possible Q's:
how would you build up the board with jQuery 
how would you construct a better win condition -->