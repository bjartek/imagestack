$(function(){
  var z = 0; 
 
  $(document).keypress(function(event){
  	var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode > 47 && keycode < 58) {
      var number = keycode - 47;
      swapImages($("#img" + number));
    }
  });

  //position pictures randomly, rotate randomly, one atop of another
   $('#pictures img').each(function() { 
    var me = $(this);
    var par = $(this).parent();
    var maxLeft = par.width() - 400;
    var maxTop = par.height() - 400;

    var leftOffset = Math.floor(Math.random()*maxLeft+1)
    var topOffset = Math.floor(Math.random()*maxTop+1)
    var angle = Math.floor(Math.random()*90+1) - 45;
    me.rotate(angle);
    z++; 
    me.css({
      'z-index': z, 
      'left' : leftOffset + 'px', 
      'top' : topOffset + 'px'
    }); 
    me.attr("id", "img" + z);
  });

  $('#pictures img').click(function() {
    var clicked = $(this);
    if(isTopImage(clicked)) { 
      return;
    }
    return swapImages(clicked); 
  });
 

  var isTopImage = function(img) { 
    return img.css('z-index') == z;
  }

  var swapImages = function (clicked) {
    var topp = $("#img" + z);
    var tmp = clicked.css('z-index');
    var next = parseInt(tmp) + 1;

    //fix z-indexes of images between top and clicked
    for(var i=next; i <= z; i++) {
      var newIndex = i -1;
      var img = $("#img" + i);
      img.attr('id', 'img' + newIndex);
      img.css('z-index', newIndex);

    }
    var prev = clicked.css('left');
    clicked.attr('id', "img" + z);
    clicked.animate({ 'left' : clicked.width() +200 + 'px' }, 'slow', function() { 
        clicked.css('z-index', z).animate({ 'left' : prev }, 'slow');
    });


  }
  
 
 
});
