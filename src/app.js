const mongoose = require("mongoose");
const validator = require('validator'); // validator for email validation

mongoose
  .connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

// schema => mongoose schema defines the structure of the documents,default values,validators,etc...
// lowercase,uppercse,enum ,etc... used for the validation (bulit-in validation)

const empSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // unique option is not validator
    lowercase: true, // validator
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  age: {
    type: Number,
    validate(value) {
      // custom validation
      if (value < 0) {
        throw new Error("Invalid age, can't be negative");
      }
    },

    // validate: {
    //   vaidator : function (value) { 
    //     return value.length < 0;
    //   },
    //   message: "Age can't be negative"
    // },
  },
  city: {
    type: String,
    required: true,
    lowercase: true,
    enum: ["nagpur", "delhi", "pune", "mumbai", "chennai", "hyderabad"],
  },
  active: Boolean,
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Please enter a valid email address: " + value);
      }
    }
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// mongoose model => collection creation
const emplist = new mongoose.model("emplist", empSchema); // (collection,schemas)

// create document or insert
const createDocument = async () => {
  try {
    // const tcsemplist = new emplist({
    //   name: "rahul",
    //   age: 20,
    //   city: "nagpur",
    //   active: true,
    // });

    // const wiproemplist = new emplist({
    //   name: "Ram",
    //   age: 23,
    //   city: "delhi",
    //   active: true,
    // });

    const wclemplist = new emplist({
      name: "sakshi",
      age: 21,
      city: "nagpur",
      email: "sakshi@gmail.com",
      active: true,
    });

    // const result = await tcsemplist.save();  to insert only one item into database
    const result = await emplist.insertMany([
      // tcsemplist,
      //   wiproemplist,
        wclemplist,
    ]); // insert multiple items into database
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// createDocument();

// read data from database
// gt - greter than 21 | gte - greater than equal to 21 | lte - less than equal to 21 | lt -less than 21 | in - equal to 21 | nin- not eual to
//or,and operator - need two expresions | nor ,
// countDocuments() - count documents | sort({name : 1}) => used 1 for asc , -1 for desc

const getDocument = async () => {
  try {
    // const data = await emplist.find({age : {$nin : 21}}).select({name:1}); // comparsion query operators
    // const data = await emplist.find({$or : [{age : 21},{name : "yash"}]}).select({name:1}); // logical query operators
    const data = await emplist
      .find({ age: 21 })
      .select({ name: 1 })
      .sort({ name: -1 }); // sorting documents
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

// getDocument();

// update documents
const updateDocuments = async (_id) => {
  try {
    const result = await emplist.findByIdAndUpdate(
      { _id },
      { $set: { name: "Shivani" } },
      { new: true }
    ); // {new : true} shows updated value
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// updateDocuments("64ab12ae4849aca551ce3d59");

// delete documents
const deleteDocuments = async (_id) => {
  try {
    const result = await emplist.findByIdAndDelete({ _id });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// deleteDocuments("64ac6244185be56ea71422b9");
