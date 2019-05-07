const request=require('request')

const geocode=(address,callback)=>{
  const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGFyYW12c2luZ2giLCJhIjoiY2p2M3FmZjF6MTkxdzN5b2JtbThsaDd2OSJ9.xIZqGtqKdB9pOlWjNsEDNA&limit=1'

  // request({url:url, json:true},(error,response)=>{
  //   if(error){
  //     callback('Unable to connect to location services!',undefined)
  //     //Even if undefined had not been set up, by default it would have been undefined
  //   } else if(response.body.features.length===0){
  //     callback('Unable to find location. Try another search.',undefined)
  //   }else{
  //     callback(undefined,{
  //       latitude:response.body.features[0].center[1],
  //       longitude:response.body.features[0].center[0],
  //       location:response.body.features[0].place_name
  //     })
  //   }
  // })

  request({url, json:true},(error,{body})=>{
    if(error){
      callback('Unable to connect to location services!',undefined)
      //Even if undefined had not been set up, by default it would have been undefined
    } else if(body.features.length===0){
      callback('Unable to find location. Try another search.',undefined)
    }else{
      callback(undefined,{
        latitude:body.features[0].center[1],
        longitude:body.features[0].center[0],
        location:body.features[0].place_name
      })
    }
  })
}

module.exports=geocode;
