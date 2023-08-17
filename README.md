# mongoose

![mongoose](https://github.com/Yashya14/mongoose/assets/108535139/d711e229-ed32-419a-8a4d-abf974f1be44)


elegant mongodb object modeling for node.js

Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose.

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

## Installation

Install mongoose

Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js and Deno (alpha)
```bash
  npm i mongoose
```
    
## Authors

- [@Yashya14](https://www.github.com/Yashya14)


