//if show the first screen
var fSShow = true,currentDtl='',dtlIDs = {}
var details = document.querySelector('#details'),navUl = document.querySelector('#navUl'),lis = document.querySelectorAll('.navLink')

var scrollObj = {}
initiateOffsetTops();
initPost();

initNav();

document.addEventListener('mousewheel',function(e){
	var scrollDown = e.deltaY>0?true:false
	if(scrollDown && fSShow){
		details.classList.remove('slideBottom')
		details.classList.add('slideTop')
		details.focus()
		fSShow = false
		return 
	}
    if(!fSShow && details.scrollTop === 0 && !scrollDown){
    	fSShow = true
    	details.classList.remove('slideTop')
    	details.classList.add('slideBottom')
    	return
    }
    //if id equals 0, then it won't goes here,since it will 'return' in upper case
    let id = dtlIDs[currentDtl],prev = id-1,next = id+1===dtlIDs.length/2?id:id+1
    //if scroll beyond current detail section
    if(details.scrollTop < scrollObj.offsetTops[currentDtl]){
    	lis[id].classList.remove('active')
    	currentDtl = dtlIDs[prev]
    	lis[prev].classList.add('active')
    }else if(details.scrollTop >= scrollObj.offsetTops[dtlIDs[next]]){
    	lis[id].classList.remove('active')
    	currentDtl = dtlIDs[next]
    	lis[next].classList.add('active')
    }
},false);
document.querySelector('#deskToTeam').addEventListener('click',function(){
	var s = 'recruitment'
	details.classList.remove('slideBottom')
	details.classList.add('slideTop')
	details.focus()	
	fSShow = false

	document.querySelector('#anchor1').classList.remove('active')
	document.querySelector('#anchor3').classList.add('active')
	currentDtl = s
	
	var curSection = document.querySelector('#'+s)
	scrollObj.slides.push({stop:scrollObj.offsetTops[s]})
	if(!scrollObj.intervalId){
	  smoothSlide()
    }
},false)
document.querySelector('#mobiToTeam').addEventListener('click',function(){
	var s = 'recruitment'
	Velocity(document.querySelector('#recruitment'),"scroll", { duration: 1000 })
	fSShow = false

	document.querySelector('#anchor1').classList.remove('active')
	document.querySelector('#anchor3').classList.add('active')
	currentDtl = s
},false)

function initPost(){
	var postDtls = document.querySelectorAll('.postDtl'),posts = document.querySelectorAll('.post')
	for(let i=0,n=posts.length;i<n;i++){
		posts[i].addEventListener('click',function(e){
			e.preventDefault()
			e.stopPropagation()
			let postID = +this.getAttribute('id').slice(-1)
			let post = postDtls[postID]
			Velocity(post,'fadeIn',300)
			details.style.overflow = 'hidden'
		})
	}
	for(let i=0,n=postDtls.length;i<n;i++){
		postDtls[i].addEventListener('click',function(e){
			e.stopPropagation()
			if(e.target === this){
				Velocity(this,'fadeOut',{display:'none'},300)
				details.style.overflow = 'scroll'		
			}
		},false)
	}
}
function initNav(){
	currentDtl = lis[0].getAttribute('href').slice(1)
	for(let i=0,n=lis.length;i<n;i++){
		dtlIDs[lis[i].getAttribute('href').slice(1)] = i
		dtlIDs[i] = lis[i].getAttribute('href').slice(1)
	}
	navUl.addEventListener('click',function(e){
		e.preventDefault()
		//if currently show the first screen,show the details immediately
		if(fSShow){
			details.classList.remove('slideBottom')
			details.classList.add('slideTop')
			details.focus()	
			fSShow = false
		}
		var liId = e.target.getAttribute('href')
		if(currentDtl === liId.slice(1)){
			return
		}
		lis[dtlIDs[currentDtl]].classList.remove('active')
		currentDtl = liId.slice(1)
		e.target.classList.add('active')
		
		var curSection = document.querySelector(liId)
		scrollObj.slides.push({stop:scrollObj.offsetTops[liId.slice(1)]})
		if(!scrollObj.intervalId){
		  smoothSlide()
	    }
	},false)
}
function initiateOffsetTops(){
	scrollObj.offsetTops = {}
	scrollObj.intervalId = 0
	scrollObj.slides=[]
	scrollObj.spaSecs = []

	var cNodes = Array.prototype.slice.call(details.childNodes)
	var eles = cNodes.filter(function(item){
		return item.nodeType ===1 && item.tagName.toLowerCase() === 'section'
	})
	var id
	for(var i=0,n=eles.length;i<n;i++){
		id = eles[i].getAttribute('id')
		scrollObj.offsetTops[id] = eles[i].offsetTop
		scrollObj.spaSecs.push({index:i,id:id,scrTop:eles[i].offsetTop})
	}
}
function smoothSlide(){
	if(!!scrollObj.slides.length){
		if(!scrollObj.intervalId){
			//judge if is current section before slide
            var stop = scrollObj.slides[0].stop,start = details.scrollTop
			if(start !== stop){
				var increment = stop>start?50:-50,counter=0
				scrollObj.intervalId = window.setInterval(function(){
					details.scrollTop += increment
					counter++
					if(counter === Math.floor(Math.abs(start-stop)/50)){
						details.scrollTop = stop
						clearInterval(scrollObj.intervalId)
						scrollObj.intervalId = 0
						scrollObj.slides.shift()
						if(!!scrollObj.slides.length){
							smoothSlide()
						}
					}
			    },10)
			}else{
				scrollObj.slides.shift()
				smoothSlide()
			}
		}
	}
}

//details.scrollTop = scrollObj.offsetTops['recruitment']
var f1 = window.getComputedStyle(document.querySelector('#test1')).fontSize;
var f2 = window.getComputedStyle(document.querySelector('#test2')).fontSize;
var f3 = window.getComputedStyle(document.querySelector('#test3')).fontSize;
//alert(f1)
//alert(f2)
//alert(f3)
