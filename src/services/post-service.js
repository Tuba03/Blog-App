import { myAxios } from "./Helper"
const CreatePost=(postData)=>{
    // /api/user/{userId}/category/{categoryId}/posts/with-media
    console.log(postData);
    return myAxios.post('/user/${postData.userId}/category/{postData.categoryId}/posts',postData).then((response)=>response.data)

}