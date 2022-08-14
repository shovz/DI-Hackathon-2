## Feedback on your front end files.

**Things done well**

-   Again, structured nicely. Not a small thing btw. I know devs who are amazing analytical thinkers but don't know how to structure an app in a way that everyone can understand what's flying. So, good job. By this, I mean good file structure, and good modularity in your code. You break things up into small functions, so things are easy to understand.
-   Nice use of localStorage to keep track of user. In production environment, it might not be the safest way, but for this hackathon, it was a great choice. Well done.

**Things to improve**

-   When doing a fetch request from the front end, since you're already on the same domain as your server, you don't need to do:
    ```js
    fetch('http://localhost:3000/deletecartitem' /* etc. */);
    ```
    You can just do:
    ```js
    fetch('/deletecartitem' /* etc. */);
    ```
    In fetch requests where the domain isn't specified, the browser automatically makes the request to the current domain.
-   Naming convention should be consistent. No PascalCase then camelCase. Not really big deal now, but convention is one of the bedrocks of clean code, so just make sure it's consistent. :)
-   Noticed a small glitch (can't really call it a bug I guess) in the home page. When you load the cart items, might be more clean to dynamically create the image elements after getting the images from the api instead of already having them created in the first place. That way, you don't get the second where it seems like they are broken images.
