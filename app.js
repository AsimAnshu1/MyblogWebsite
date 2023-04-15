
const express = require("express");
const bodyParser = require("body-parser");
const _= require("lodash");
const mongoose= require("mongoose");
const ejs = require("ejs");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
const postSchema =mongoose.Schema({
  title:String,
  post:String
});
const Post = mongoose.model("Post", postSchema);
// let posts =[];

app.get("/", async function(req, res){
  const foundItems =await Post.find();
    res.render("home", {startingContent : homeStartingContent, NewPost : foundItems});

});

app.get("/about", function(req,res){
res.render("about", {AboutContent :aboutContent});
});
app.get("/contact", function(req, res){
res.render("contact", {ContactContent : contactContent});
});
app.get("/compose",function(req,res){
res.render("compose");

});
app.post("/compose", async function(req, res){
  const postTitle =req.body.postTitle;
  const postContent = req.body.postBody;
// const post ={
//   title : req.body.postTitle ,
//   content : req.body.postBody
// };
// posts.push(post);
const monPost = new Post({
    title :postTitle,
    post : postContent
});
await monPost.save();

res.redirect("/");
});
app.get("/posts/:postId", async function(req, res){
  const reqId = req.params.postId;
  const posts = await Post.findOne({_id: reqId});
  if(posts===null){
    console.log("cannot find");
    
  }else {
    res.render("post",{postTitle: posts.title , postContent:posts.post});
  }
  // posts.forEach(function(post){
  //   if(_.lowerCase(post.title) === _.lowerCase(req.params.postName)){
  //     res.render("post",{postTitle: post.title,postContent: post.content });
  //   }
  // });

/*   Another way 1
var check =false;
  for(var i=0;i<posts.length;i++){
   if( posts[i].title ===){
    
    check = true;
    break;
   }
  }
  if(check){
    console.log("match found!");
  }
  else{
    console.log("match not found!");
  }  */
  /*  Another way 2
  var result = posts.find(({ title }) => title);
if(Object.values(result)[0]=== req.params.postName){
  console.log("match found!");
} else{
console.log("match not found");
}
*/

});
}


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
