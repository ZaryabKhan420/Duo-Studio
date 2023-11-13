
// LOCOMOTIVE CODE 
function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll


const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
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
loco();


// CURSOR 
function mouseFollower(){
  document.addEventListener("mousemove",(details)=>{
    var x = details.x;
    var y = details.y;
      gsap.to(".cursor",{
        zIndex:"999",
        left: x,
        top: y,
    })
  });
}
mouseFollower();

// VIDEO CONTAINER ANIMATION
function videoAnimation(){

  document.querySelector(".video-container").addEventListener("mouseenter",()=>{
      gsap.to(".cursor",{
        width:'70',
        innerHTML:"SOUND ON",
        borderRadius:"500rem",
    })
  });

  document.querySelector(".video-container").addEventListener("mouseleave",()=>{
      gsap.to(".cursor",{
        width:'1.5rem',
        height:"1.5rem",
        innerHTML:"",
        borderRadius:"50%",
    })
  });

}
videoAnimation();

// CLIENT SECTION ANIMATION
function clientAnimation(){

  var box = document.querySelectorAll(".client");
  var crsr = document.querySelector(".cursor");
  box.forEach((element) => {
    element.addEventListener("mouseenter",()=>{
      var att = element.getAttribute("data-image");
        crsr.style.height = "30rem";
        crsr.style.width = "30rem";
        crsr.style.borderRadius = "0";
        crsr.style.backgroundImage = `url(${att})`;
    })
    element.addEventListener("mouseleave",()=>{
      var att = element.getAttribute("data-image");
        crsr.style.height = "1.5rem";
        crsr.style.width = "1.5rem";
        crsr.style.borderRadius = "50%";
        crsr.style.backgroundImage = `none`;
    })
  });

}
clientAnimation();

// Footer Button Magnet Animation 
function footerbtnAnimation(){
  var footerBtnParent = document.querySelector(".footer-top-right");
  var footerBtn = document.querySelector(".footer-top-right > .btn");
  const lerp = (x, y, a) => x * (1 - a) + y * a;
  
  
  footerBtnParent.addEventListener("mousemove",(dets)=>{
  
    var dims = footerBtn.getBoundingClientRect();
    var xStart = dims.x;
    var xEnd = xStart+dims.width;
    var yStart = dims.y;
    var yEnd = yStart+dims.height;
    var zeroOne1 = gsap.utils.mapRange(xStart,xEnd,0,1,dets.clientX);
    var zeroOne2 = gsap.utils.mapRange(yStart,yEnd,0,1,dets.clientY);
  
    gsap.to(footerBtn,{
      duration:"0.0000001",
      x: lerp(-30,30,zeroOne1),
    })
    
    gsap.to(footerBtn.children,{
      duration:"0.0000001",
      x: lerp(-10,10,zeroOne1),
    })
  
    gsap.to(footerBtn,{
      duration:"0.0000001",
      y: lerp(-30,30,zeroOne2),
    })
    
    gsap.to(footerBtn.children,{
      duration:"0.0000001",
      y: lerp(-10,10,zeroOne2),
    })

    gsap.to(".footer-top-right > .btn",{
      color:"#fff",
      backgroundColor:"#000",
    })

    gsap.to(".cursor",{
      duration:"0.0000001",
      opacity:0,
    })
  
  })
  
  footerBtnParent.addEventListener("mouseleave",(dets)=>{
  
    var dims = footerBtn.getBoundingClientRect();
    var xStart = dims.x;
    var xEnd = xStart+dims.width;
    var yStart = dims.y;
    var yEnd = yStart+dims.height;
    var zeroOne1 = gsap.utils.mapRange(xStart,xEnd,0,1,dets.clientX);
    var zeroOne2 = gsap.utils.mapRange(yStart,yEnd,0,1,dets.clientY);
  
    gsap.to(footerBtn,{
      duration:"0.0000001",
      x: 0,
    })
    
    gsap.to(footerBtn.children,{
      duration:"0.0000001",
      x: 0,
    })
  
    gsap.to(footerBtn,{
      duration:"0.0000001",
      y: 0,
    })
    
    gsap.to(footerBtn.children,{
      duration:"0.0000001",
      y: 0,
    })

    gsap.to(".footer-top-right > .btn",{
      color:"#000",
      backgroundColor:"#fff",
    })

    gsap.to(".cursor",{
      duration:"0.0000001",
      opacity:1,
    })
  
  })
}

footerbtnAnimation();

var tl1 = gsap.timeline({scrollTrigger:{
    trigger:"#page1",
    scroller:"#main",
    start:"50% 50%",
    end:"75% 60%",
    scrub:true,
    // markers:true
}})

tl1.to("#page1 > .headings > h1",{
    x:"-800",
    y:"-200",
},"a")

tl1.to("#page1 > .headings > h2",{
    x:"800",
    y:"-200",
},"a")

tl1.to(".video-container",{
    width:"90%",
    height:"80vh",
})

var tl2 = gsap.timeline({scrollTrigger:{
  trigger:"#page2",
  scroller:"#main",
  start:"0% 50%",
  end:"0% 70%",
  scrub:true,
  // markers:true
}})

tl2.to("#main",{
  backgroundColor:"#fff",
})

var tl3 = gsap.timeline({scrollTrigger:{
  trigger:"#page4",
  scroller:"#main",
  start:"0% 50%",
  end:"0% 70%",
  scrub:true,
  // markers:true
}})

tl3.to("#main",{
  backgroundColor:"#0F0D0D",
})

var purple = document.querySelector(".purple");
var links = document.querySelectorAll(".navbar-link");
links.forEach((element) => {
  element.addEventListener("mouseenter",()=>{
    gsap.to(".purple",{
      display:"block",
      opacity:"1",
      duration:0.2,
    })
    gsap.to(".purple > h1",{
      left:"-100%",
      duration:5,
      repeat:-1,
    })
  })
  element.addEventListener("mouseleave",()=>{
    gsap.to(".purple",{
      display:"none",
      opacity:"0",
      duration:0.2,
    })
  })
});