function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
init()

gsap.from(".page1 h1, .page1 h2",{
  y:10,
  rotate:10,
  opacity:0,
  delay:0.3,
  duration:0.7
});

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: "#main",
    start: "top 10%",
    end: "top 0",
    scrub: 3,
  }
})

tl.to(".page1 h1",{
   x: -100
})
tl.to(".page1 h2",{
  x: 100
},0)


const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1",
    scroller: "#main",
    start: "top -60%",
    end: "top -70%",
    scrub: 5,
  }
})
tl2.to(".page2",{
  backgroundColor: "#fff"
})

var crsr = document.querySelector(".cursor")
document.addEventListener("mousemove", function(dets){
  crsr.style.left = dets.x+5+"px";
  crsr.style.top = dets.y+5+"px";
})

const tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1",
    scroller: "#main",
    start: "top -180%",
    end: "top -220%",
    scrub: 2,
  }
})

tl3.to(".page3",{
  backgroundColor:"#0F0D0D"
})

var boxes = document.querySelectorAll(".feature")
// console.log(boxes)
boxes.forEach(function(elem){
  elem.addEventListener("mouseenter", function(){
    var att = elem.getAttribute("data-image")
    // console.log("attribute",att)
    crsr.style.width = "400px"
    crsr.style.height = "300px"
    crsr.style.borderRadius = "0"
    crsr.style.backgroundImage = `url(${att})`
  })
  elem.addEventListener("mouseleave", function(){
    elem.style.backgroundColor= "transparent"
    crsr.style.width = "20px"
    crsr.style.height = "20px"
    crsr.style.borderRadius = "50%"
    crsr.style.backgroundImage = `none`
  })

})
