import Ember from "ember";
import CssEvents from "../utils/css-events";

export default Ember.Component.extend({
  classNameBindings: [":mui-ripple",
                      "muiClass",
                      "visible:mui-is-visible"],

  visible: false,
  muiClass: null,

  rippleEvent: null,
  rippleEventChange: function(){
    this.animate(this.get("rippleEvent"));
  }.observes("rippleEvent"),

  animate: function(e){
    var el = this.$(),
      offset = el.parent().offset(),
      pageX = e.pageX === undefined ? e.nativeEvent.x : e.pageX,
      pageY = e.pageY === undefined ? e.nativeEvent.y : e.pageY,
      x = pageX - offset.left,
      y = pageY - offset.top;

    this._animateRipple(el, x, y);
  },

  animateFromCenter: function() {
    var el = this.$()[0],
      x = el.parentNode.offsetWidth / 2,
      y = el.parentNode.offsetHeight / 2;

    this._animateRipple(el, x, y);
  },

  _animateRipple: function(el, x, y) {
    var that = this;
    el.css({
      transition: "none",
      top: y + "px",
      left: x + "px"
    });

    this.set("visible", true);

    CssEvents.onAnimationEnd(el, function() {
      that.set("visible", false);
      that.sendAction("action");
    });
  }
});