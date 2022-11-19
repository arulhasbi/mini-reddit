# Mini Reddit

### Read me first!
You may use VPN (if you are conveniently located in the blocked regions, i.e, Indonesia) to access reddit.com due to authorization process needed for experiencing [this project](https://bespoke-starburst-2c9e28.netlify.app/).

![Screenshot](ss-final.png)

### Introduction
Hey folks, it's me again with another project. So, I have been working on this repo for almost 5 days now (definitely longer than my previous projects) and that is because I encountered ~*a difficult*~ an interesting couple of things along the way, such as writing an authorization module for obtaining access token from reddit's authorization server, so I could have an access to it's APIs. For that authorization module alone, I took a good amount of times to read and understand the [api documentation](https://www.reddit.com/dev/api/). Reddit API use OAuth2.0 protocol, therefore, if you guys inspired to replicate this project, here is [the article](https://medium.com/swlh/understanding-oauth-2-0-dc7ef422d915) to help you understand briefly about the protocol.

After I (presumably) done with the authorization module, I did not quite satisfy with the way I manage the API credentials and the obtained access token. With that being said, I looked again to my code and asked myself a question:

**_Does it okay to show the api credentials directly or is there a way to properly hide it? and if I show it directly, what would be the consequences?_**

and another one:

**_How to properly set and remove the obtained access token when user does log in and log out respectively?_**

### Researching for question's solution

**_Does it okay to show the api credentials directly or is there a way to properly hide it? and if I show it directly, what would be the consequences?_**

Turns out the consequnce could be **VERY COSTLY** and showing it directly **IS DEFINITELY NOT OKAY** such as the discussion in [this article](https://medium.com/@morgannegagne/a-very-expensive-aws-mistake-56a3334ed9ad). 

In the development phase:

I learned to create `.env` file in the root's project directory and that's where I put my API credentials. Then, insert the newly created `.env` file into `.gitignore` file, so the API credentials don't get into my github. I could access the API credentials through `process.env` object.

In the production phase:

I learned to use the [netlify's key management](https://docs.netlify.com/configure-builds/environment-variables/) system to set up the environment variables. 

**_How to properly set and remove the obtained access token when user does log in and log out respectively?_** 

Alright, I did store the obtained access token into the `localStorage`, so whenever user close the browser, the app would still have an access to the token. However, I'm still not sure what should I do when the user is logging out.

I read [how to destroy JWT token on log out](https://stackoverflow.com/questions/37959945/how-to-destroy-jwt-tokens-on-logout) and on Jamil Noyda response I found some good starting ideas:

- **We cannot manually expires token once it is created** 
- **Delete the stored token from client-side upon log out**: I did this by removing access token from `localStorage` whenever users are logging out.
- **Blacklist all of the token that are not valid no more and have not expired yet**: So, in the `redirect_uri`, reddit attach `code` as one of the URL parameters for us a requirement to make an access token request. After I obtained the access token, I tried to make a new request for an access token using the same `code` and turns out I got an error response which I think reddit authorization server did performs the blacklist process.

In summary: I stored the obtained access token in the `localStorage` and simply removes it from `localStorage` when log out happens. We could also creates a logic where the app could automatically log out when a [user does not make any click in 30 seconds](https://stackoverflow.com/questions/71499969/settimeout-and-cleartimeout-in-react).

Further, unlike the previous ones, I used the mobile-first approach to develop this project's site.

I think that's all and I will add more to this writing, if there is any. See you guys in another project. Peace!.

### Dependencies

- @fortawesome/fontawesome-svg-core: `^6.2.0`
- @fortawesome/free-solid-svg-icons: `^6.2.0`
- @fortawesome/react-fontawesome: `^0.2.0`
- @heroicons/react: `^2.0.13`
- @reduxjs/toolkit: `^1.9.0`
- moment: `^2.29.4`
- react-redux: `^8.0.5`
- redux: `^4.2.0`
- styled-components: `^5.3.6`
- @tailwindcss/forms: `^0.5.3`
- tailwindcss: `^3.2.4`

### Available Scripts

In the project directory, you can run:

### `npm install`

To install all of the needed dependencies, then:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You may also see any logs in the console when performing any form submission event.
