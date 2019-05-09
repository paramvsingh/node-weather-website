const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//console.log(path.join(__dirname,'../public'))

const app=express()
const port=process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather App',
    name:'Param'
  })
})
// app.get('',(req, res)=>{
//   res.send({
//     name: 'Param',
//     age: 20
//   })
// })

//app.com
//app.com/help
//app.com/about
//app.com/weather

// app.get('/help',(req,res)=>{
//   res.send('<h1>Help page</h1>')
// })
//
// app.get('/about',(req,res)=>{
//   res.send('<h1>About page!</h1>')
// })

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Param'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    helpText: 'This is some helpful text.',
    title: 'Help Page',
    name:'Param'
  })
})



app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error: 'Please provide an address'
    })
  }
  else{

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
      //We need to provide default object for {latitude,longitude,location}={} otherwise application will crash if error occurs
      if(error){
        return res.send({error})
      }
      // console.log('Error',error)
      // console.log('Data',data)
      forecast(latitude,longitude, (error, forecastData) => {
        if(error){
          return res.send({error})
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        })
        // console.log(location)
        // console.log(forecastData)
      })
    })

  }

  // res.send({
  //   address: req.query.address,
  //   temperature: 39
  // })
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }

  console.log(req.query)
  res.send({
    products:[]
  })
})
app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Param',
    errorMessage:'Help article not found'
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404',
    name:'Param',
    errorMessage:'Page not found'
  })
})
app.listen(port, ()=>{
  console.log('Server is up on port '+port)
})
