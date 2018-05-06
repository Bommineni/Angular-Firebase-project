module.exports = function(app)
{
  app.post("/api/addpost", createPost);
  app.put("/api/updatepost/:postId", updatePost);
  app.get("/api/addpost", findAllPosts);
  app.delete("/api/deletepost/:postId", deletePost);

  var mongoose = require("mongoose");
  var PostSchema = mongoose.Schema({
    question : String,
    answer: String,
    tag: String,
    dateCreated: {type: Date, default: Date.now}
  });

  var PostModel = mongoose.model("PostModel", PostSchema);

  function createPost(req, res) {
    console.log("in app");
    PostModel
      .create(req.body)
      .then(
        function(test) {
          res.json(test);
        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }

  function updatePost(req, res){
      var postId = req.params.postId;
      var editpost = req.body;
      console.log('server side', postId, editpost);
      PostModel
        .update({_id: postId}, editpost)
        .then(
          function(status){
            res.send(200);
          },
          function(error){
            res.statusCode(404).send(error);
          }
        )
  }

  function findAllPosts(req,res){
      PostModel
        .find().sort({dateCreated : -1})
        .then(
          function(posts){
            console.log(posts[0].question);
            res.json(posts);

          },
          function(error){
            res.statusCode(400).send(error);
          }
        );

  }

  function deletePost(req, res) {
    console.log("delete server side");
    var postId = req.params.postId;
    console.log("server Side"+ postId);
    PostModel
      .remove({_id: postId})
      .then(
        function(result) {
          console.log("result");
          res.json(result);
          console.log("result" + result);

        },
        function(err) {
          res.status(400).send(err);
        }
      );
  }
};
