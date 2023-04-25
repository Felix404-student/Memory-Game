# Memory-Game
Assignment "Memory Game" for UMass/Springboard Bootcamp

Written in HTML, CSS, and JavaScript

Players will be shown a collection of cards, face down, and can click on a card to reveal what’s underneath.

After clicking on two cards, the game should check to see whether they match. If they do, they will remain facing up.

If not, the cards should remain displayed to the player for one second, and then flip back down.

The goal of the game is to match up all the pairs.

# Part One - Reading the code
Take a look at the starter code provided.
<ul>
<li>We have an array of colors which we shuffle and then loop over to create 10 <div> elements on the page and give them a class of the color we loop over.</li>
<li>We then append the <div> elements to the DOM and add an event listener for a “click” for each of the elements.</li>
</ul>
Make sure to read through the code before continuing on!

# Part Two - Implementing clicks and matches
<ul>
<li>Clicking a card should change the background color to be the color of the class it has.</li>
<li>Users should only be able to change at most two cards at a time.</li>
<li>Clicking on two matching cards should be a “match” — those cards should stay face up.</li>
<liWhen clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.</li>
</ul>

# Part Three - Gotchas
<ul>
<li>Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t count as a match!)</li>
<li>Make sure that you can not click too quickly and guess more than two cards at a time.</li>
</ul>

# Further Study
<ul>
<li>Add a button that when clicked will start the game</li>
<li>Add a button that when clicked will restart the game once it has ended</li>
<li>For every guess made, increment a score variable and display the score while the game is played</li>
<li>Store the lowest-scoring game in local storage, so that players can see a record of the best game played.</li>
</ul>
