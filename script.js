function locomotive(){
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

let tl = gsap.timeline();
function loader(){
    let h5 = document.querySelector("#timer h5");
    let grow = 0;

    setInterval(function(){
        if(grow<100){
            grow++;
            h5.innerHTML = grow;
        }
    },30)

    gsap.from(".line h1",{
        y:150,
        stagger:0.2
    })

    gsap.from(".line #timer h5,.line #timer h6",{
        y:150
    })

    tl.to("#loader",{
        opacity:0,
        delay:3.3,
        zIndex:0
    })
    
    tl.from("#main",{
        y:1000,
        opacity:0
    })
}

function courser(){    
    Shery.mouseFollower();
    Shery.makeMagnet("#part3 h6");
    Shery.makeMagnet("#part1 i");
}

function center(){
    tl.from("#page1 nav",{
        opacity:0
    })

    tl.from("#page1 #center h1,#page1 #center h2,#page1 #center h3",{
        y:50,
        stagger:0.1,
        opacity:0
    }) 
    
    tl.from(".video-container",{
        y:10,
        opacity:0
    })
}

function shery(){
    Shery.imageEffect("#img-container .imgs",{
        scale:5,
        gooey:true,
        config:{"a":{"value":3.66,"range":[0,30]},"b":{"value":-0.95,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.8011762410901281},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":-0.010752688172043001,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.27,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0,"range":[0,10]},"metaball":{"value":0.4,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10.69,"range":[0,100]}},
    })
}

function video(){
    let vidcont = document.querySelector(".video-container")
    let video = document.querySelector(".video-container video")
    // let vidcur = document.querySelector("#video-cursor")
    
    vidcont.addEventListener("mouseenter",function(){
        vidcont.addEventListener("mousemove",function(dets){
            gsap.to("#video-cursor",{
                x : dets.x - 900,
                y : dets.y - 200
            })
        })
        
        let flag = 0;
        vidcont.addEventListener("click",function(){
            if(flag==0){
                video.play();
                video.style.opacity = 1;
                flag = 1;
            }
            else{
                video.pause();
                flag = 0;
                video.style.opacity = 0;
            }
        })
    })
    
    vidcont.addEventListener("mouseleave",function(){
        gsap.to("#video-cursor",{
            x:"67%",
            y:"-15%"
        })
    })
    
}

function flag(){
    let flag = document.querySelector("#underline");
    document.addEventListener("mousemove",function(dets){
        gsap.to("#flag",{
            x:dets.x,
            y:dets.y,
        })
    })

    flag.addEventListener("mouseenter",function(){
        gsap.to("#flag",{
            opacity:1,
        })
    })

    flag.addEventListener("mouseleave",function(){
        gsap.to("#flag",{
            opacity:0,
        })
    })
}

function footeranime(){
    let h1 = document.querySelector("#page6 #head h1");
    let splited = h1.textContent.split("");
    let clutter = "";
    splited.forEach(function(e){
        clutter+=`<p>${e}</p>`
    })
    h1.innerHTML = clutter;

    h1.addEventListener("mouseenter",function(p){
        h1.style.width="90%"
        gsap.to("#page6 #head h1 p",{
            webkitTextStroke:"1px white",
            fontFamily:"silk serif",
            stagger:0.02,
            color: "transparent",
            fontWeight: 400,
            fontSize: "7vw",
        })
    })

    h1.addEventListener("mouseleave",function(){
        h1.style.width="77%"
        gsap.to("#page6 #head h1 p",{
            webkitTextStroke:"0px white",
            color:"white",
            fontFamily:"Plain",
            stagger:0.02,
            fontWeight: 500,
            opacity:1
        })
    })
}

loader();
courser();
locomotive();
center();
shery();
video();
flag();
footeranime();