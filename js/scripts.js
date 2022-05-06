let arrowState=0
document.addEventListener('DOMContentLoaded',e=>{
    // const audio = document.createElement('audio')
    // audio.src='assets/ambient.mp3'
    // audio.play()
    // audio.loop=true
    // audio.addEventListener('ended',e=>{
    //     audio.currentTime=0
    //     audio.play()

    // })

    const triangle=document.querySelector('.triangle')
    const smallTriangle=document.querySelector('.small-triangle')

    const stadium= document.querySelector('.stadium')
    const iniPage= document.querySelector('.ini-page')
    const playBtn= document.querySelector('.play-btn')
    const clock = document.querySelector('.time .cant')
    const goalsCounter = document.querySelector('.goals .cant')
    const port= document.querySelector(".port")
    const bonification= document.querySelector(".bonification")
    
    const ball= document.querySelector(".ball")
    const fakeBall= document.querySelector(".fake-ball")
    const fakePort= document.querySelector(".fake-port")
    fakePort.style.width=port.offsetWidth+'px'
    fakePort.style.height=port.offsetHeight+'px'
    fakePort.style.top=port.getBoundingClientRect().top+'px'
    fakePort.style.left=port.getBoundingClientRect().left+'px'

    const arrowContainer= document.querySelector(".icon-container")
    const arrowHorizontal= document.querySelector(".arrow")
    const arrowShadow= document.querySelector(".icon-container-shadow")
    
    const tryAgain= document.querySelector(".try-again")
    const tryCant= document.querySelector(".try-cant")
    const tryBtn= document.querySelector(".try-btn")
    const plusIndicator= document.querySelector(".plus-goal")
    const golIndicator= document.querySelector(".gol-indicator")
    const missIndicator= document.querySelector(".miss-indicator")
    const timeOff= document.querySelector(".time-off")


    let timeIni=Date.now()
    let timeIniH=Date.now()
    let arrowIntervalV=null
    let shadowInterval=null
    let arrowIntervalH=null
    let strength=null
    /*BALL MOVEMENT VARIABLES */
    let strengthVal=0
    let ballHeight=0
    let ballHor=0


    playBtn.addEventListener('click',e=>{
        

        bonification.style.display='block'
        showBonif()
        
        ball.addEventListener('click',e=>{
    
            if(arrowState==0){
                console.log('vertical')
              
                clearInterval(arrowIntervalV)

                let value=parseFloat(arrowContainer.style.transform.split(',')[3].split('deg')[0])

                ballHeight=(value+60)*2
                arrowState=1
               
                arrowIntervalH=setInterval(moveArrowH, 50);
            }else if(arrowState==1){
               
                ballHor=(parseFloat(arrowHorizontal.style.transform.split('(')[2].split('deg')[0])+60)*100/120
            
                clearInterval(arrowIntervalH)
               

                triangle.style.display='block'
                smallTriangle.style.visibility='visible'
                smallTriangle.style.top='calc(63% + 90px)'

                let dir=1
                strength=setInterval(()=>{
                    if(dir==0){
                        smallTriangle.style.top='calc(63% + 92px)'
                        dir=1
                    }else{
                        smallTriangle.style.top='63%'
                        dir=0
                    }
                },1000)
                arrowState=3

            }else if(arrowState==3){
                arrowShadow.style.display='none'


                let bottomTop=triangle.offsetTop+triangle.offsetHeight
                strengthVal= bottomTop - smallTriangle.offsetTop
                clearInterval(strength)
                // smallTriangle.style.top=`calc(63% + ${100 - strengthVal}px)`
                smallTriangle.style.transition='all 0s'
                smallTriangle.style.visibility='hidden'
                triangle.style.display='none'
                smallTriangle.style.top=`63%`


               /*HIDDING ARROW */
            //    ball.style.top='40%'
               let value= (strengthVal * 0.8) + ballHeight
               fakeBall.style.top=`calc(${-value}px + 30%)`
               let tempLeft=stadium.getBoundingClientRect().left
               let tempWidth=stadium.getBoundingClientRect().width
               let calc=((ballHor*tempWidth)/100)+tempLeft
               fakeBall.style.left=calc+'px'
               
                let collide=is_colliding(fakePort,fakeBall)
                if(collide){                    
                    let newCant=0

                    if(is_collidingBonif(bonification,fakeBall)){
                        plusIndicator.firstElementChild.textContent='+5'
                        showIndicator(plusIndicator,true)
                        showIndicator(golIndicator)
                        newCant=parseInt(goalsCounter.textContent)+5

                    }else{
                        plusIndicator.firstElementChild.textContent='+1'
                        showIndicator(plusIndicator,true)
                        showIndicator(golIndicator)
                        newCant=parseInt(goalsCounter.textContent)+1
                        

                    }
                    if(newCant<10){
                        goalsCounter.innerText='0'+ newCant
                    }else{
                        goalsCounter.innerText=newCant
                    }
                }else{
                    showIndicator(missIndicator)
                    
                }


                arrowContainer.style.visibility='hidden'
                ball.style.top=`calc(${-value}px + 30%)`

                
                ball.style.left=calc+'px'
                
                
                if(collide){
                    ball.style.transition='.4s'
                    ball.style.width='22px'
                    ball.style.height='22px'
                    setTimeout(()=>{    
                        // ball.style.width='20px'
                        // ball.style.height='20px'
                        ball.style.width='19px'
                        ball.style.height='19px'     
                        ball.style.top='30%'                        
                    },300)                    
                    setTimeout(resetBallPosition,1500)
                }else{
                    ball.style.width='18px'
                    ball.style.height='18px'
                    setTimeout(resetBallPosition,1500)

                }
                
                arrowState=0
                iniV=true
                arrowDirectionV=1
                arrowDirectionH=3
                rotateDown=0;
                rotateUp=-60;
                rotateLeft=60;
                rotateRight=-60;
                rotateIni=0
    
            }
    
        })
        iniPage.style.display='none'
        startTimer()

        arrowIntervalV=setInterval(moveArrowV, 75);
        // shadowInterval=setInterval(moveShadow, 700);
        // moveShadow()
        
    })

    tryBtn.addEventListener('click',()=>{
        // resetBallPosition(true)
        goalsCounter.innerText='00'
        tryAgain.style.display='none'
        ball.style.display='block'
        bonification.style.display='block'
        showBonif()
        startTimer()
        clearInterval(arrowIntervalV)
        clearInterval(arrowIntervalH)
        arrowIntervalV=setInterval(moveArrowV, 75);
    })

    const resetBallPosition=(fromTry=false)=>{
        clearInterval(arrowIntervalV)
        clearInterval(arrowIntervalH)
        smallTriangle.style.transition='all 1s'
        ball.style.top='70%' 
        ball.style.left='50%' 

        ball.style.width='100px'
        ball.style.height='100px'
        ball.style.transition='.5s'
        ballHeight=0
        ballHor=0

        arrowShadow.firstElementChild.style.width='28px'
        
        shWidth=28

        if(fromTry){
            setTimeout(()=>{            
                arrowContainer.style.transform='translateX(-50%) rotate3d(1,0,0,0deg)'
                arrowHorizontal.style.transform=`translateX(-50%) rotate(0deg)`
                arrowShadow.style.display='block'

                
            },500)

            arrowState=0
            iniV=true
            arrowDirectionV=1
            arrowDirectionH=3
            rotateDown=0;
            rotateUp=-60;
            rotateLeft=60;
            rotateRight=-60;
            rotateIni=0

        }else{
            setTimeout(()=>{            
                arrowContainer.style.visibility='visible'
                arrowContainer.style.transform='translateX(-50%) rotate3d(1,0,0,0deg)'
                arrowHorizontal.style.transform=`translateX(-50%) rotate(0deg)`
                arrowIntervalV=setInterval(moveArrowV, 75);
                arrowShadow.style.display='block'

            },500)

            showBonif()
        }

        
    }
        

  
    // let shadowDirection = 1
    // let shadowOriginalHeight=arrowShadow.offsetHeight
    // function moveShadow(){
        
    //     if(shadowDirection==1){
    //         arrowShadow.firstElementChild.style.width=`0px`

    //         shadowDirection=0
    //     }else{
    //         arrowShadow.firstElementChild.style.width=`28px`

    //         shadowDirection=1
    //     }

    // }

//ARROW VERITCAL MOVEMENT
    let arrowDirectionV=1
    //0-UP 1-DOWN
    let iniV=true
    let rotateDown=0;
    let rotateUp=-50;
    let shWidth = 28;
    function moveArrowV(){
        // console.log(shWidth)
        console.log('VERTICAL')
        timeIni=Date.now()
        arrowContainer.style.transition="all .08s"
        if(iniV){
            iniV=false
        }
        
        if(arrowDirectionV == 0){
            
            rotateUp=rotateUp+5
            
            let shadowCalc=  2.8 + shWidth
            shWidth=parseFloat(shadowCalc.toFixed(2)) 
            if(shWidth>28){
                arrowShadow.firstElementChild.style.width=`28px`
                shWidth=28

            }else{
                arrowShadow.firstElementChild.style.width=`${shWidth}px`

            }


            
            if(rotateUp==0){                
                arrowDirectionV=1
                arrowContainer.style.transform='translateX(-50%) rotate3d(1,0,0,0deg)'
                rotateUp=-50
                
            }else{
                arrowContainer.style.transform=`translateX(-50%) rotate3d(1,0,0,${rotateUp}deg)`

            }
        }else if(arrowDirectionV == 1){
         
            rotateDown=rotateDown-5
           
            let shadowCalc=shWidth - 2.8
            shWidth=parseFloat(shadowCalc.toFixed(2)) 

            if(shWidth<0){
                shWidth=0
                arrowShadow.firstElementChild.style.width=`0px`
                
            }else{
                arrowShadow.firstElementChild.style.width=`${shWidth}px`

            }

            if(rotateDown==-50){


                arrowDirectionV=0
                arrowContainer.style.transform=`translateX(-50%) rotate3d(1,0,0,${rotateDown}deg)`
                rotateDown=0
                
            }else{
                arrowContainer.style.transform=`translateX(-50%) rotate3d(1,0,0,${rotateDown}deg)`

                


            }
      
        }
    }

//ARROW HORIZONTAL MOVEMENT

    let rotateLeft=50;
    let rotateRight=-50;
    let rotateIni=0
    let arrowDirectionH=3
    //0-left 1-right
    function moveArrowH(){
        console.log('HORIZONTAL')

        timeIni=Date.now()
        arrowHorizontal.style.transition="all .04s"
        if(arrowDirectionH == 3){
            rotateIni=rotateIni+5
            if(rotateIni==50){
                arrowDirectionH=0
                arrowHorizontal.style.transform=`translateX(-50%) rotate(${rotateIni}deg)`
                rotateIni=0
            }else{
                arrowHorizontal.style.transform=`translateX(-50%) rotate(${rotateIni}deg)`
            }
        }if(arrowDirectionH == 0){            
            rotateLeft=rotateLeft-5
            if(rotateLeft==-50){
                arrowDirectionH=1
                arrowHorizontal.style.transform=`translateX(-50%) rotate(${rotateLeft}deg)`
                rotateLeft=50
            }else{
                arrowHorizontal.style.transform=`translateX(-50%) rotate(${rotateLeft}deg)`
            }

        }else if(arrowDirectionH == 1){
            rotateRight=rotateRight+5
            if(rotateRight==50){
                arrowDirectionH=0
                arrowHorizontal.style.transform=`translateX(-50%) rotate(${rotateRight}deg)`
                rotateRight=-50
            }else{
                arrowHorizontal.style.transform=`translateX(-50%) rotate(${rotateRight}deg)`

            }

        }
    }
    

    const is_colliding = (div1,div2)=>{

        let d1_height=div1.offsetHeight
        let d1_width=div1.offsetWidth
        let d1_distance_from_top= div1.offsetTop + d1_height
        let d1_distance_from_left = div1.offsetLeft + d1_width

        let d2_height=div2.offsetHeight
        let d2_width=div2.offsetWidth
        let d2_distance_from_top= div2.offsetTop + d2_height
        let d2_distance_from_left = div2.offsetLeft + d2_width

        let topVerify=false
        if(div2.offsetTop < div1.offsetTop && div2.offsetTop + 10> div1.offsetTop){
            topVerify=true
        }else if(div2.offsetTop > div1.offsetTop){
            topVerify=true            
        }
 
        let colliding = (div2.offsetLeft > div1.offsetLeft &&
                        div2.offsetLeft < (div1.offsetLeft + d1_width) &&
                        topVerify &&
                        div2.offsetTop < (div1.offsetTop + d1_height))
        
        return colliding

    }

    const startTimer = ()=>{
        let start=60
        const timeInterval=setInterval(()=>{
            if(start==0){
                timeOff.style.visibility='hidden'
                tryCant.innerText=goalsCounter.textContent

                strengthVal=0
                ballHeight=0
                ballHor=0
                smallTriangle.style.transition='all 0s'
                smallTriangle.style.visibility='hidden'
                start=60
                clock.textContent=start
                tryAgain.style.display='block'
                clearInterval(strength)
                
                
                clearInterval(timeInterval)
                resetBallPosition(true)
                ball.style.display='none'
                bonification.style.display='none'
                triangle.style.display='none'
                smallTriangle.style.transition='all 1s'
                setTimeout(()=>{
                    clearInterval(arrowIntervalV)
                    clearInterval(arrowIntervalH)

                },500)
            }else{

                start=start - 1
                if(start<10){
                    clock.textContent='0'+start
                    if(start<=3){
                        timeOff.style.visibility='visible'
                        timeOff.firstElementChild.textContent=start
                    }
                }else{
                    clock.textContent=start
                }

            }
        },1000)
    }

    const showBonif=()=>{
        
            
        let bonifFromTop=getRandom(fakePort.offsetHeight) + fakePort.offsetTop
        let bonifFromLeft=getRandom(fakePort.offsetWidth) + fakePort.offsetLeft
        let vtop = (fakePort.offsetTop + fakePort.offsetHeight) - bonifFromTop
        let vleft = (fakePort.offsetLeft + fakePort.offsetWidth) - bonifFromLeft
        if(vtop < 22){
            bonifFromTop = bonifFromTop - 20
        }
        if(vleft < 22){
            bonifFromLeft= bonifFromLeft - 20
        }   
        bonification.style.top=`${bonifFromTop}px`
        bonification.style.left=`${bonifFromLeft}px`
    
    }
})






const is_collidingBonif = (fake,real)=>{
    // console.log(((real.offsetLeft>fake.offsetLeft)  && real.offsetLeft< (fake.offsetLeft + fake.offsetWidth) && real.offsetTop>fake.offsetTop  && real.offsetTop< (fake.offsetTop + fake.offsetHeight)))
    // console.log(((real.offsetTop+real.offsetHeight)>fake.offsetTop && (real.offsetLeft > fake.offsetLeft  && real.offsetLeft< (fake.offsetLeft + fake.offsetWidth) )))
    // console.log(((real.offsetLeft+real.offsetWidth)>fake.offsetLeft && (real.offsetLeft+real.offsetWidth)<(fake.lef+fake.offsetWidth) && real.offsetTop>fake.offsetTop  && real.offsetTop< fake.offsetTop + fake.offsetHeight))
    // console.log(((real.offsetTop+real.offsetHeight)>fake.offsetTop && (real.offsetTop+real.offsetHeight)<(fake.offsetTop+fake.offsetHeight) && (real.offsetLeft+real.offsetWidth)>fake.offsetLeft && (real.offsetLeft+real.offsetWidth)<(fake.offsetLeft+fake.offsetWidth)))

    // console.log(real.offsetLeft)
    // console.log(real.offsetWidth)
    // console.log(fake.offsetLeft)
    // console.log(fake.offsetWidth)


    let colliding =(((real.offsetLeft>fake.offsetLeft)  && real.offsetLeft< (fake.offsetLeft + fake.offsetWidth) && real.offsetTop>fake.offsetTop  && real.offsetTop< (fake.offsetTop + fake.offsetHeight))||
    ((real.offsetTop+real.offsetHeight)>fake.offsetTop && (real.offsetLeft > fake.offsetLeft  && real.offsetLeft< (fake.offsetLeft + fake.offsetWidth) ))||
    ((real.offsetLeft+real.offsetWidth)>fake.offsetLeft && (real.offsetLeft+real.offsetWidth)<(fake.lef+fake.offsetWidth) && real.offsetTop>fake.offsetTop  && real.offsetTop< fake.offsetTop + fake.offsetHeight)||
    ((real.offsetTop+real.offsetHeight)>fake.offsetTop && (real.offsetTop+real.offsetHeight)<(fake.offsetTop+fake.offsetHeight) && (real.offsetLeft+real.offsetWidth)>fake.offsetLeft && (real.offsetLeft+real.offsetWidth)<(fake.offsetLeft+fake.offsetWidth))
     )
    
    return colliding

}



const getRandom= (limit)=>{
    let random = Math.random() * limit
    return parseInt(random)
}

const showIndicator = (indicator,mini=false)=>{
    indicator.style.visibility='visible'
    if(!mini){
        indicator.firstElementChild.style.fontSize='50px'
    }else{
        indicator.firstElementChild.style.top='0px'
    }

    setTimeout(()=>{
        indicator.style.visibility='hidden'
        if(!mini){
            indicator.firstElementChild.style.fontSize='0px'
        }else{
            indicator.firstElementChild.style.top='-26px'
        }
    },1000)
}