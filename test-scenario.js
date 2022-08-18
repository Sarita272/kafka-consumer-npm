const kafkaConsumer = require("./consumer.js");

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