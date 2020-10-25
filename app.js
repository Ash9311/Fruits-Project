
const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type:Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);

const fruit=new Fruit({
  name:"Apple",
  rating:7,
  review: "Pretty solid as a fruit."
});

fruit.save();
const personSchema= new mongoose.Schema({
  name:String,
  age:Number
});

const Person= mongoose.model("Person",personSchema);

const person=new Person({
  name:"Ash",
  age:22
});

const kiwi=new Fruit({
  name:"Kiwi",
  score:10,
  review:"The best fruit!"
});

const orange=new Fruit({
  name:"Orange",
  score:4,
  review:"Too sour"
});

const banana=new Fruit({
  name:"Banana",
  score:3,
  review:"weird texture"
});

Fruit.insertMany([kiwi,orange,banana],function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully saved all the fruits to fruitDB");
  }
});


  Fruit.find(function(err,fruits){
    if(err){
      console.log(err);
    }
    else{
      fruits.forEach(function(fruit){
        console.log(fruit.name);
      });
    }
  });

//Fruit.updateOne({_id: "5bc0854dd6ec7ad010738bc7"},{name:"Pearch"},function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("Successfully updated the document.");
//   }
// });

Person.deleteMany({name:/Ash/},function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Successfully deleted");
  }
}
);



//person.save();

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
