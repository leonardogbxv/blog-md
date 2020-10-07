# Markdown Blog

Markdown based blog using Node.js and MongoDB. It uses [marked](http://https://github.com/markedjs/marked "marked") library to parse and compile markdown.

## Features

A simple useful blog system, you can handle all your needs without leaving the site.

- Admin session store
- Admin login/logout
- Create new posts
- Upload images/files to the server
- Edit posts
- Delete posts
- Blog pagination
- Disqus comment system
- ...

## Installation

[Cloning a repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)
```bash
$ git clone https://github.com/leonardogbxv/blog-md.git
$ cd blog-md
$ npm install
$ npm run dev
```

## Dependencies

Project dependencies and for what they were used for.

- [**Nodemon:**](https://github.com/remy/nodemon "**Nodemon:**") Automatically refresh our web page when file changes are made;
- [**Express:**](https://github.com/expressjs/express "**Express:**") "..provide small, robust tooling for HTTP servers";
- [**Mongoose:**](https://github.com/Automattic/mongoose "**Mongoose:**") MongoDB object modeling;
- [**EJS:**](https://github.com/mde/ejs "** EJS:**") Template engine;
- [**Marked:**](https://github.com/markedjs/marked "**Marked:**") Markdown parser and compiler;
- [**Slugify:**](https://www.npmjs.com/package/slugify "**Slugify:**") Converts a string to a slug;
- [**method-override:**](https://github.com/expressjs/method-override "**method-override:**") Use _PUT/DELETE/..._ in places where the client doesn't support it;
- [**Dompurify:**](https://github.com/cure53/DOMPurify "**Dompurify:**") Sanitizes HTML and prevents XSS attacks;
- [**JSDom:**](https://github.com/jsdom/jsdom "**JSDom:**") Render HTML inside of Node.js;
- [**express-session:**](https://www.npmjs.com/package/express-session "**express-session:**") Assign an unique session to identify the user (in this case, the admin).
- [**memorystore:**](https://www.npmjs.com/package/memorystore "**memorystore:**") Session store for express (without leaks version).
- [**dotenv:**](https://www.npmjs.com/package/dotenv "**dotenv:**") Environment variables.
- [**Multer:**](https://www.npmjs.com/package/multer "**Multer:**") Node.js middleware for handling multipart/form-data, used for uploading files.
- [**Bootstrap:**](https://getbootstrap.com/docs/4.5/getting-started/introduction/ "**Bootstrap:**") Front-end framework with a giant collection of handy CSS codes.



## Todo 📝

- [x] Add post slug
- [x] Add XSS sanitizer
- [x] Add admin session authentication
- [x] Add image upload
- [x] Add posts pagination
- [x] Integrate Disqus
- [ ] ...