**Things that were done well**

-   First of all, I can see the effort you guys put into this. Well done.
-   The file is pretty clean and well structured as well. :) I can clearly understand what you're doing at each point.
-   Good use of db relationships.
-   line 158,169: Woohoo, using like. Noice. In all seriousness, you did a very nice job with your search functionality!!
-   Object destructuring too. Cool. ;D

**Things to improve**

-   line 4: In general db connection object should be in a separate file, so it can be imported wherever it needs to be used in the app. You aren't using it in other places, so not a big deal. Just letting you know the convention. Also, good idea to make each of the values for the fields in the connection object into environment variables and include them that way. More safe. If you haven't learnt that yet, good thing to look into. ;)
-   line 18: Doesn't hurt, but also EJS automatically searches for the `views` directory in the same level as the server.js file anyway, so this isn't really necessary.
-   line 21-25: I understand why you did this, and it works, which is great. Better way to do this would be to just keep it at one line:

    ```js
    app.use('/', express.static(__dirname + '/public'));
    ```

    but to put this line **after** all of your routes.

    Keep in mind: **express (or any node server) runs sequentially**. This means that let's say the client tries getting an asset, like `js/cart.js`. Because it's in a script tag, what happens is the browser automatically makes a GET request to the server to get that resource. Now, since there isn't any handler for that specific resource, it doesn't get handled by any of the routing functions. Therefore, the request gets passed down to the end of the file where express automatically handles it like a static asset and finds the file for you in the defined path. Just a cleaner way of using the actual environment of express to do the work for you, so you don't have to define too many things explicitly.

-   line 58: Careful. Best to validate you're getting an array from client. Also, instead of calling `db('products').insert(/**/)` many times in a loop, you could just create an array of all the products you want to insert, then do just one call of `db('products').insert(array_goes_here)`.
-   line 141: Since you're already catching potential errors here and handling them, you'll never reach line 146.
-   line 204/221: Instead of doing a POST request to delete something and adding the word "delete" in the name of the request, remove the word "delete" from the request and just change the http method to DELETE.
-   Now some general feedback:
    -   Use more `const` instead of `let`, since `let` should only be used when you're planning on changing the variable's value later on.
    -   What you did at the end of your code by making utility functions was nice. I'd recommend using more of those in the future. Also, you can put them in their own file and import them throughout your code when needed instead of keeping everything in the main server file.
