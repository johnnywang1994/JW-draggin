// JW-draggin v1.0.1
// .draggable, .drop-area
window.addEventListener('load', function() {
  (function(global){
    var e = ".draggable {position: relative;display: inline-block;cursor: move;}", t = document.createElement("style");
    t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), document.getElementsByTagName("head")[0].appendChild(t);
  
    var dragged = null;
    var items = document.querySelectorAll('.draggable');
    var target_area = document.querySelectorAll('.drop-area');
    
    var cancelDefault = function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
    var drag_start = function(event) {
      var style = global.getComputedStyle(event.target, null);
      dragged = event.target;
      event.dataTransfer.setData("text/plain",
      (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
    }
    var drag_over = function(event) { 
      cancelDefault(event);
    } 
    var drop = function(event) { 
      var offset = event.dataTransfer.getData("text/plain").split(',');
      dragged.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
      dragged.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
      cancelDefault(event);
    }

    items.forEach((v) => {
      v.setAttribute('draggable', true);
      v.addEventListener('dragstart',drag_start,false);
    });
    target_area.forEach((v, i) => {
      v.addEventListener('dragover',drag_over,false);
      v.addEventListener('drop',drop,false);
    });
  })(window)
});