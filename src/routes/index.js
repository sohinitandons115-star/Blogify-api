const express=require('express');
const router=express.Router();

const userRouter=require('./user.routes');
const postRouter=require('./posts.routes');

router.get('/about',(req,res)=>{
    res.send('Welcome to the About page');
});

router.get('error-test',(req,res)=>{
    throw new Error('This is a test error');
});

router.use('/users',userRouter);
router.use('/posts',postRouter);

module.exports=router;