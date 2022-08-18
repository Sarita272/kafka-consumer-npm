# kafka-consumer-npm

This is a basic package to consume messages from kafka topic.

[![NPM](https://nodei.co/npm-dl/kafka-consumer-npm.png?months=1)](https://www.npmjs.com/package/kafka-consumer-npm)

# Install
npm install --save kafka-consumer-npm

## API

### How to use

```js
const kafkaConsumer = require("kafka-consumer-npm"); 
```
```js
async function main() {

    kafkaConsumer.configure({
        brokers: ["localhost:9092"],
        saslUser: undefined,
        saslPass: undefined,
        consumerGroup: "test-consumer-group",
        topics: ["TestTopicBySarita"],
        autoCommit: true,
        allowAutoTopicCreation: false,
        readUncommitted: false,
        fromBeginning: true
    });
    
    await kafkaConsumer.initKafkaConsumer(function(topic, offset, partition, message){
        console.log({
    
            topic: topic,
            partition: partition,
            offset: offset,
            value: message,
          })
    });
    
    await kafkaConsumer.isReady();
    }
    
    main();
```
