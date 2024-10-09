import {Post,Comment} from "../models/post.js"

export const getdata = (req,res)=>{
// iit will fecth data from db and show



Post.findAll()
    .then(data=>{
        // console.log('fetched data',data);
        // fetch all the comment realted to the post
        res.json({'data':data})   //try later
        // res.json(data)
    })
    .catch(err=>{
        console.log("data not fetched!!");
        
    })
}

export const postadd_data = (req,res)=>{
    console.log('inside the body parse',req.body);
    // it will insert the data
    Post.create({
        image:req.body.title,
        desc:req.body.description
    })
    .then(data=>{
        res.json({'data':data})
        //redirect to get data
    })
    .catch(err=>{
        console.log("data not created");
    })
}


// export const postcomment = (req,res) =>{
//     const body = req.body.text;
//     const postId = req.params.postId;
    
//     Comment.create({
//         content:body,
//         postId: postId
//     }).then(data=>{
//         console.log('comment saved..',data);
//         res.json({"text":data})
//     })
//     .catch(err=>{console.log('commented not sos far',err);
//     })
// }

export const postcomment = async (req,res) =>{
    const body = req.body.text;
    const postId = req.params.postId;
    
    try {
        await Comment.create({
            content:body,
            postId: postId
        })
        // fecth the comment on this post
        try {
        
            const postwithcomments = await Post.findOne({
                where:{id:postId},  // find the post by its id
                include:[{
                    model:Comment,   // include comment model
                    as:"Comments"
                }]
            })

            if(! postwithcomments){
                res.json({"text":"not comment found !!"}) 
            }
            // console.log('post with comment array',postwithcomments.Comments);
            // only retrunt rhr comment array
            res.json({'data':postwithcomments.Comments})
        } catch (error) {
            console.log('comment related to this post not found..');
            
        }
    } catch (error) {
        console.log('sorr some internal error on coomment fexthc');
        
    }
}


