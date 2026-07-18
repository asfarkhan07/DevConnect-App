const express= require('express');
const connectDB=require('./config/db.js');
const app=express();
const path=require('path');

const dns=require('dns');
//Change DNS
dns.setServers(["1.1.1.1","8.8.8.8"]);

//Connect Database
connectDB();



app.use(express.json({extended:false}));

app.use('/api/users',require('./routes/api/users.js'));
app.use('/api/profile',require('./routes/api/profile.js'));
app.use('/api/posts',require('./routes/api/posts.js'));
app.use('/api/auth',require('./routes/api/auth.js'));

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  console.log('Production mode: using :any(*) catch-all route');

  app.use(express.static('client/build'));

  app.get(/^\/.*$/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
}

console.log('Routes Mounted')

const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));