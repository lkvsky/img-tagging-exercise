var TT = (function() {
  function Tag(name, left, top) {
    var that = this;

    this.name = name;

    this.left = left;

    this.top = top;

    this.render = function() {
      newDiv = $("<div>")
        .addClass("tag")
        .attr("id", that.name)
        .css("left", that.left)
        .css("top", that.top);

      label = $("<div>")
        .html(that.name)
        .addClass("label")
        .css("top", 85);

      $(newDiv).append(label);

      return newDiv;
    };
  };


  function positionTag(element, names) {
    this.element = element;

    this.bindEvent = function() {
      this.element.click(this.handleClick.bind(this));
    };

    this.handleClick = function(event) {
      var clickLocation = {
        posX: (event.pageX - 40),
        posY: (event.pageY - 40)
      }

      this.positionSquare(clickLocation);
      this.nameTag();
    };

    this.nameTag = function() {
      $("li").click(function() {
        var name = $(this).html();
        $("li").removeClass("selected");
        $(this).addClass("selected");
        $("#temp").attr("data-name", name);
      });
    };

    this.positionSquare = function(clickLocation) {
      var left = clickLocation.posX;
      var top = clickLocation.posY;

      $("#temp").show();
      $("#temp").css("left", left).css("top", top);
    };

    this.createTag = function() {
      var list = this.createList();
      list.css("left", 60);
      newDiv = $("<div>")
        .addClass("tag")
        .attr("id", "temp")
        .hide();

      newDiv.append(list);
      $("body").append(newDiv);
    };

    this.createList = function() {
      var list = $("<ul>");

      $.each(names, function(ind, val) {
        var element = $("<li>").html(val).addClass("namesList");
        list.append(element);
      });

      return list;
    };
  };

  function commitTag(db) {
    this.addTag = function() {
      var left = parseInt($("#temp").css("left"));
      var top = parseInt($("#temp").css("top"));
      var name = $("#temp").attr("data-name");

      var obj = new Tag(name, left, top);

      db.push(obj);
      return obj;
    };
  };


  return {
    Tag: Tag,
    positionTag: positionTag,
    commitTag: commitTag
  };
})();

$(function () {
  var tags = [
    new TT.Tag("Car", 200, 200),
    new TT.Tag("Shoulder", 300, 300)];

  var names = ["Brawny Gal", "Godzilla", "Mothra", "Cyclops"];

  var image = $("#image");
  var tags = tags;

  var positionTag = new TT.positionTag(image, names);
  var commitTag = new TT.commitTag(tags);

  $(tags).each(function() {
    image.append(this.render());
  })

  $("#addTag").click(function() {
    positionTag.createTag();
    positionTag.bindEvent();
  });

  $("#stopTagging").click(function() {
    var tag = commitTag.addTag();
    image.append(tag.render());
    $("#temp").hide();
    console.log(tags);
  });

});



