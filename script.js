var Tags = [
  {x: 325, y: 640, name: "Alligator"},
  {x: 400, y: 450, name: "Pump"}]

var Names = ["Fangy Worm", "Gas Mask Ninja",
             "Snajke", "Blob", "Onyx Skelly", "GhostyFace"]


function commitTags() {
  var newTag = {

    temp: $("#temp"),

    handleEvent: function() {
      var obj = this.addTags();
      this.renderTag(obj);
    },

    addTags: function() {
      var left = parseInt(this.temp.css("left"));
      var top = parseInt(this.temp.css("top"));
      var name = this.temp.data("name");

      var obj = {
        x: left,
        y: top,
        name: name
      };

      Tags.push(obj);
      return obj;
    },

    renderTag: function(obj) {
      var left = obj.x;
      var top = obj.y;
      newDiv = $("<div>")
        .addClass("tag")
        .attr("id", obj.name)
        .css("left", left)
        .css("top", top);

      label = $("<div>")
        .html(obj.name)
        .addClass("label")
        .css("top", 85);

      $(newDiv).append(label);
      $("#image").append(newDiv);
    }
  }

  return newTag
}

// function tagList(Names) {

// }

function makeTagger(element) {
  var tagger = {

    element: $(element),

    bindEvent: function() {
      this.element.click(this.handleClick.bind(this));
    },

    handleClick: function(event) {
      var clickLocation = {
        posX: (event.pageX - 40),
        posY: (event.pageY - 40)
      }

      this.positionSquare(clickLocation)
    },

    positionSquare: function(clickLocation) {
      $("#temp").remove();
      var list = this.createList();
      list.css("left", 60);

      var left = clickLocation.posX;
      var top = clickLocation.posY;
      newDiv = $("<div>")
        .addClass("tag")
        .attr("id", "temp")
        .css("left", left)
        .css("top", top);

      newDiv.append(list);
      this.element.append(newDiv);
    },

    createList: function() {
      var list = $("<ul>");

      $.each(Names, function(ind, val) {
        var element = $("<li>").html(val).addClass("namesList");
        list.append(element);
      });

      return list;
    }

  };

  tagger.bindEvent();

  return tagger;
};

$(function() {
  var element = $("#image");

  $("#addTag").click(function() {
    makeTagger(element)
  });

  $("#stopTagging").click(function() {
    var commit = commitTags();
    commit.handleEvent();

  });

  $(Tags).each(function() {
    var left = this.x;
    var top = this.y;
    newDiv = $("<div>")
      .addClass("tag")
      .attr("id", this.name)
      .css("left", left)
      .css("top", top);

    label = $("<div>")
      .html(this.name)
      .addClass("label")
      .css("top", 85);

    $(newDiv).append(label);
    $("#image").append(newDiv);
  });
});