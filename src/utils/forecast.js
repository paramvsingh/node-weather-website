const request=require('request')

const forecast=(latitude,longitude,callback)=>{
  const url='https://api.darksky.net/forecast/84713391ff66eaaf85d1837df7f8e989/'+latitude+','+longitude+'?units=si'

  // request({url: url, json: true},(error,response)=> {
  //   if(error){
  //     callback('Unable to connect to weather service!',undefined)
  //   }
  //   else if(response.body.error){
  //     callback(`${response.body.error}`,undefined)
  //   }
  //   else{
  //     callback(undefined,`${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability*100}% chance of rain.`)
  //   }
  // })

  request({url, json: true},(error,{body})=> {
    if(error){
      callback('Unable to connect to weather service!',undefined)
    }
    else if(body.error){
      callback(`${body.error}`,undefined)
    }
    else{
      callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. The high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow}. There is a ${body.currently.precipProbability*100}% chance of rain.`)
    }
  })
}

module.exports=forecast;
