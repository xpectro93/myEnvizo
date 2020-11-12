import React from 'react'
import '../css/VisualPrediction.css'

let people = 'https://static1.squarespace.com/static/55947ac3e4b0fa882882cd65/58ab7b04bebafb337899961d/58ab7b16725e25c4fac43d33/1487647075724/NS_0010.png'

let recyclePics = ["https://atlas-content-cdn.pixelsquid.com/stock-images/crumpled-paper-n1KArDA-600.jpg",'https://www.freepnglogos.com/uploads/tupperware-png-logo/tupperware-png-logo-symbol-29.png','https://static1.squarespace.com/static/5aa5dcd84eddec7350a4c420/5aa83b4ee4966b2fc584cb7e/5aa83bd3e2c4839970f7f5b6/1520974805200/metal-can-beans-z-500.png','https://purepng.com/public/uploads/large/purepng.com-glass-bottlebottle-food-glass-object-941524620381f6zci.png']

let plasticBagsPics = ['https://images.homedepot-static.com/productImages/69aac6d0-3e4b-471b-a4e6-5bff204b3162/svn/plasticmill-garbage-bags-pm334615bl100-64_1000.jpg',"https://images.homedepot-static.com/productImages/5acdcf0d-42b3-4a6c-89a0-d5f486f2d110/svn/stout-garbage-bags-stoe3348e85-64_1000.jpg"]

let waterBottlePics = ['https://www.friscotexas.gov/ImageRepository/Document?documentID=19531','https://b.kisscc0.com/20180813/hbe/kisscc0-fizzy-drinks-coca-cola-drink-can-computer-icons-soda-refrigerante-5b7195177b0c06.282002171534170391504.png']

const populate = (picType,garb,garbImg,leCase) => {
  for(let i = 0; i < garb; i++){
    let randNum = Math.floor(Math.random()*picType.length)

    garbImg.push(<img id={leCase} key={i} src={picType[randNum]} alt='garbage'/>)
  }
}

export const VisualPrediction = (props) => {
  let garb = Math.floor(props.result);
  let garbImg = [];
  let instance=''

  if(props.type==="Recycle"){
    instance = 'recyclePics'
    populate(recyclePics,garb,garbImg,instance)
  }else if(props.type==="Reusable Grocery Bag"){
    instance = 'plasticBagsPics'
    populate(plasticBagsPics,garb,garbImg,instance)
  }else if(props.type==="Drink Tap Water"){
    instance = 'waterBottlePics'
    populate(waterBottlePics,garb,garbImg,instance)
  }else{
    return null
  }

  return (
    <div className='VisualWrapper'>
    <img id='people'src={people} alt='people'/>
    <div id='garbageList'>
    {garbImg.reverse()}
    </div>
    </div>
  )
}
