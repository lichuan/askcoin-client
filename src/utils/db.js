import {appState} from "../net/net";

const Realm=require('realm');

const topicSchema = {
  name: 'topicSchema',
  primaryKey:'topic_key',
  properties:{
    topic_key:{type:'string',indexed:true},
    type:'int',
    topic_data:'string',
    topic_reward:'int',
    block_id:'int',
    block_hash:{type: 'string', optional:true},
    utc:'int',
    id:'int',
    avatar:'int',
    name:'string'
  }
};

const replySchema = {
  name: 'replySchema',
  primaryKey: 'reply_key',
  properties: {
    reply_key:{type:'string',indexed:true},
    type: 'int',
    reply_data:'string',
    balance: 'int',
    block_id: 'int',
    block_hash: 'string',
    utc: 'int',
    id: 'int',
    avatar: 'int',
    name: 'string',
    topic_key: 'string',
    reply_to: {type: 'string', optional:true},
  }
};

const realm = new Realm({schema:[topicSchema, replySchema]});

 const addTopic = (topic,type)=>{
     realm.write(()=>{
       topic.type = type;
       realm.create('topicSchema', topic, true);
     });
};

 const deleteNotPastTopic = ()=>{
   let topics = realm.objects("topicSchema");
   const notPastTopics = topics.filter((item)=>{
     return appState.blockID - item.block_id < 4320
   });

   realm.write(()=>{
     notPastTopics.forEach((item)=>{
       realm.delete(item)
     })
   });

 }


 const getTopic = (type)=>{
   let topics = realm.objects("topicSchema").filtered(`type==${type}`);
   if(type === 0){
      const pastTopics = topics.filter((item)=>{
        return appState.blockID - item.block_id > 4320
      });

     realm.write(()=>{
       pastTopics.forEach((item)=>{
         realm.delete(item)
       })
     });
     topics = topics.filter((item)=>{
       return appState.blockID - item.block_id < 4320
     })
   }

   return topics;
 };

 const deleteTopic = (key) =>{
   const topics = realm.objects('topicSchema').filter((item)=>{
     return item.topic_key === key
   });
   console.log('delete topic',key,topics)
   realm.write(()=>{
     realm.delete(topics);
   })
 };


 const addReply = (replies, key)=>{
   realm.write(()=>{
     replies.forEach((item)=>{
       item.topic_key = key;
       realm.create('replySchema', item, true)
     })
   })
 };



 const getReply = () =>{
   return realm.objects('replySchema');
 };

const deleteReply = (key) =>{
  const replies = realm.objects('replySchema').filter((item)=>{
    return item.reply_key === key
  });
  realm.write(()=>{
    realm.delete(replies);
  })
};

 const deleteReplyByTopicKey =(key)=>{
   const replies = realm.objects('replySchema').filter((item)=>{
     return item.reply_key === key
   });
   try {
     realm.write(()=>{
       realm.delete(replies);
     })
   }catch (error){

   }

 };

 const deleteAll = ()=>{
   const replies = realm.objects('replySchema');
   let topics = realm.objects("topicSchema");
   try {
     realm.write(()=>{
       realm.delete(replies);
       realm.delete(topics)
     })
   }catch (error){

   }

 };




 export {addTopic, getTopic, deleteTopic, addReply, getReply,deleteReplyByTopicKey, deleteReply,deleteAll, deleteNotPastTopic}
