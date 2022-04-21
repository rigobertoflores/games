let arrowState=0
document.addEventListener('DOMContentLoaded',e=>{
    const ball= document.querySelector(".ball")
    const arrowContainer= document.querySelector(".icon-container")
    let timeIni=Date.now()

    ball.addEventListener('click',e=>{

        if(arrowState==45){
            console.log(Date.now())

            console.log(Date.now()-timeIni)
          
            // clearInterval(arrowIntervalV)
        }else if(arrowState==1){
            
        }else if(arrowState==2){

        }else if(arrowState==0){
            ball.style.top='0' 
            ball.style.width='40px'
            ball.style.height='40px'
    
            setTimeout(resetBallPosition,1200)
        }

    })
    
    const resetBallPosition=()=>{
        ball.style.top='75%' 
        ball.style.width='80px'
        ball.style.height='80px'

    }


    let arrowDirectionV=0
    let iniV=false
    
    function moveArrowV(){
        timeIni=Date.now()
        if(iniV){
            arrowContainer.style.transition="all 1s"
            iniV=false
        }
        if(arrowDirectionV == 0){
            arrowContainer.style.transform='rotate3d(1,0,0,0deg)'
            arrowDirectionV=1

        }else if(arrowDirectionV == 1){

            arrowContainer.style.transform='rotate3d(1,0,0,-10deg)'
            arrowContainer.style.transform='rotate3d(1,0,0,-20deg)'
            arrowContainer.style.transform='rotate3d(1,0,0,-30deg)'
            arrowContainer.style.transform='rotate3d(1,0,0,-40deg)'

            arrowDirectionV=0
        }
    }
    const arrowIntervalV=setInterval(moveArrowV, 900);



    let arrowDirectionH=0
    function moveArrowH(){
        arrowContainer.style.transition="all .5s"

        if(arrowDirectionH == 0){
            arrowContainer.style.transform='rotate(-40deg)'
            arrowDirectionH=1

        }else if(arrowDirectionH == 1){
            arrowContainer.style.transform='rotate(40deg)'
            arrowDirectionH=0
        }
    }

    // const arrowIntervalH=setInterval(moveArrowH, 800);


})


