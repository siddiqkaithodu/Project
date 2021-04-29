let bc=document.getElementById("background-canvas"); 
let bctx=bc.getContext("2d"); 
let background=document.createElement("img");
background.src="images/background.jpg";
background.onload = function(){
    bctx.drawImage(background,0,0,500,500);   
}
let c=document.getElementById ("mycanvas");
let ctx=c.getContext("2d"); 
let loadImage=(src,callback)=>{	
let img=document.createElement("img");	
img.onload=()=>callback(img);	
img.src=src;
};
let imagePath=(frameNumber,animation) =>{	
return "images/"+animation+"/"+frameNumber+".png";	
};
let frames={ 
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7], 
    punch:[1,2,3,4,5,6,7], 
    block:[1,2,3,4,5,6,7,8,9],
    forward:[1,2,3,4,5,6],
    backward:[1,2,3,4,5,6],
     
};
let loadImages=(callback) =>{	
let images={idle:[],kick:[],punch:[],block:[],forward:[],backward:[],};	
let imagesToLoad=0;	
["idle","kick","punch","block","forward","backward"].forEach((animation)=>{
    let animationFrames=frames[animation];
imagesToLoad=imagesToLoad+animationFrames.length;
animationFrames.forEach((frameNumber)=>{
let path=imagePath(frameNumber,animation);	
loadImage(path,(image)=>{	
images[animation][frameNumber-1]=image;	
imagesToLoad=imagesToLoad-1;	
if(imagesToLoad===0) {	
callback(images) ;	
} 
});
});
});
};
let animate=(ctx,images,animation,callback)=>{ idle:[1,2,3,4,5,6,7,8]
images[animation].forEach((image, index) =>{	
setTimeout(()=> {	
ctx.clearRect(0,0,500,c.height); 
ctx.drawImage(image,0,0,500,500);}
,index*100);	
});
setTimeout (callback,images[animation].length*100); 
};
loadImages((images)=>{
  let quedAnimation=[];
let aux=()=>{
    let selectedAnimation; 
    if(quedAnimation.length===0) 
    {  
        selectedAnimation="idle";
    } 
    else 
    {  
        selectedAnimation=quedAnimation.shift();
    }

animate(ctx,images,selectedAnimation,aux);
};
aux(); 
document.getElementById("kick").onclick=()=> 
{  
    quedAnimation.push("kick")
    
} ;
document.getElementById("punch").onclick=()=> 
{  
    quedAnimation.push("punch");
    
};  
document.getElementById("block").onclick=()=> 
{  
    quedAnimation.push("block");
    
};  
document.getElementById("forward").onclick=()=> 
{  
    quedAnimation.push("forward");
    
};  
document.getElementById("backward").onclick=()=> 
{  
    quedAnimation.push("backward");
    
}; 
document.addEventListener("keyup",(event)=>{ 
    const key=event.key; 
    if(key==="ArrowDown") 
    {   
        quedAnimation.push("kick");
    } 
    else if (key==="ArrowUp")
    { 
        quedAnimation.push("punch");
    } 
    else if (key==="ArrowRight")
    { 
        quedAnimation.push("forward");
    }  
    else if(key==="ArrowLeft")
     { 
        quedAnimation.push("backward");
    } 
    else if(key==="Enter")
     { 
        quedAnimation.push("block");
    }
}); 
});
