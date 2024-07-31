const express = require('express')
const connectDB = require('./importData')
const cors= require('cors')
const app = express()

const port = 3000

app.use(cors())


app.get('/fetch-end-year', async(req, res) => {
  try{

    const db = await connectDB()
    const collect = db.collection('insights')

    const data = await collect.find({ end_year: { $exists: true, $ne: null, $ne: "" } },
    {projection:{end_year:1}}).sort({end_year:1}).limit(10).toArray()

    console.log(data)

    res.json(data)

  }catch(e){

    console.log('Error file feching',e)
    res.status(500).send('Error while fetching')

  }
})


app.get('/fetch-sector',async( req,res)=>{


  try{

    const db = await connectDB()
const collect = db.collection('insights')



 const pipeline=[
  {
    $group:{
      _id:'$sector',
      count:{$sum:1}
    }
  }
 ]

  const data = await collect.aggregate(pipeline).toArray()
  console.log(data)



  // chart format

  const labels = data.map(entry=>entry._id)
  const counts = data.map(entry=>entry.count)

  const chartData={
    labels,
    counts
  }

  res.json(chartData)
  }catch(e){
    console.log("Error while fetching",e)
    res.status(500).send("Error while fetching")
  }

  
})



// THis could be wrong approach as start_year and end_year both are present
app.get('/fetch-pestle-likelihood',async(req,res)=>{


  const db= await connectDB()
  const collect=  db.collection('insights')



  const pipeline=[
    {
      $group:{
        _id:'$pestle',
        avgLikelihood:{$avg:'$likelihood'}

      }
    },
    {
      $project:{
        _id:0,
        pestle:'$_id',
        avgLikelihood:1

      }
    }
  ]


  const data= await collect.aggregate(pipeline).toArray()

  console.log(data)



  res.json(data)

})


app.get('/fetch-relevance-likelihood',async(req,res)=>{

  const db= await connectDB()
  const collect = db.collection('insights')



  const pipeline = [
    

    

      {
      $match: {
        pestle: { $ne: "" }
      }

    },

    {
        $group: {
            _id: '$topic',
            avgRelevance: { $avg: '$relevance' },
            avgLikelihood: { $avg: '$likelihood' }
        }
    },
    {
        $project: {
            _id: 0,
            topic: '$_id',
            avgRelevance: 1,
            avgLikelihood: 1
        }
    }
  
];

   
  const data = await collect.aggregate(pipeline).toArray()
  

   console.log(data)
  

  





  res.json(data)
})



app.get('/fetch-country',async(req,res)=>{

  const db= await connectDB()
  const collect= db.collection('insights')


  const pipeline=[
    {
      $match:{
        country:{$ne:""}
      }
    },
    {
      $group:{
        _id:'$country',
        avgImpact:{$avg:'$impact'}
      }
    },
    {
      $project:{
        _id:0,
        country:'$_id',
        avgImpact:1


      }
    },
    {
      $match: {
        avgImpact: { $ne: null }
      }
    }
  ]


  const data = await collect.aggregate(pipeline).toArray()

  console.log(data)

  res.json(data)


})



app.get('/fetch-oil-validity',async(req,res)=>{

  const db= await connectDB()
  const collect = db.collection('insights')

  const pipeline=[
    {
      $match:{
        title:"Oil Prices will be more Volatile in 2017"
      }
    },
    {
      $group: {
        _id: '$title',
        avgIntensity: { $avg: '$intensity' },
        avgRelevance: { $avg: '$relevance' },
        avgLikelihood: { $avg: '$likelihood' }
      }
    },
    {
      $project: {
        _id: 0,
        title: '$_id',
        avgIntensity: 1,
        avgRelevance: 1,
        avgLikelihood: 1
      }
    }
  ]
  const data = collect.aggregate(pipeline).toArray()

  res.json(data[0])

})


app.get('/fetch-topic',async(req,res)=>{
  const db = await connectDB();
  const collect = db.collection('insights')

  const data = await collect.distinct('topic');

  console.log(data.length)

  res.json(data.length)
  
})


app.get('/fetch-impact-end-year',async(req,res)=>{
  const db = await connectDB()
  const collect = db.collection('insights')

  const pipeline=[
    {
      $match:{
        end_year: { $exists: true, $ne: null, $ne: "" },
        impact: { $exists: true, $ne: null, $ne: "" }
      }
    },
    {
      $group:{
        _id:"$end_year",
        avgImpact:{$avg:"$impact"}
      }
    },
    {
      $sort:{avgImpact:-1}
    },
    {
      $limit:1
    }
  ]

  const data = await collect.aggregate(pipeline).toArray()
  console.log(data)

  if(data.length>0){
    res.json({ end_year: data[0]._id, avgImpact: data[0].avgImpact });
  }else {
    res.status(404).json({ message: 'No data found' });
}


})




app.get('/fetch-source',async(req,res)=>{
  const db = await connectDB();
  const collect = db.collection('insights');


  const data = await collect.distinct('source');

  
  res.json(data.length-1);


})


app.get('/fetch-pestle',async(req,res)=>{
  const db = await connectDB()
  const collect= db.collection('insights')

  const data = await collect.distinct('pestle');
  console.log(data.length);

  res.json(data.length-1)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})