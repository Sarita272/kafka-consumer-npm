const kafka = require("kafkajs");
var config;
var consumer;


async function initKafkaConsumer(configb) {
    
    let saslProvided = (config.saslUser != undefined) && (config.saslPass != undefined);
    let saslExcluded = (config.useSasl === false);
    let saslConfig = {
        mechanism: "plain",
        username: config.saslUser,
        password: config.saslPass
    };
    
    const client = new kafka.Kafka({
        clientId: config.clientId,
        brokers: config.brokers,
        sasl: !saslProvided || saslExcluded ? undefined : saslConfig,
        logLevel: kafka.logLevel.WARN
    });

    const consumer = client.consumer({
        groupId: config.consumerGroup,
        autoCommit: config.autoCommit,
        allowAutoTopicCreation: config.allowAutoTopicCreation,
        readUncommitted: config.readUncommitted
    });

    console.log("Subscribing from Topic..");

    await consumer.subscribe({
        topics: config.topics,
        fromBeginning: config.fromBeginning
    });

    console.log("Starting consumer process ...");
    
    await consumer.run({
        eachMessage: async (payload) => {
            let partition = payload.partition;
            let topic = payload.topic;
            let offset = Number(payload.message.offset);
            let messageStr = payload.message.value.toString();

            configb(topic, offset, partition, messageStr);
 
        }
    });
    
    console.log(`Consumer initialized.`);
}

function isReady() {
    if (consumer != undefined)
        return consumer.clientReady;

    return false;
}

async function closeConsumer() {
    if (consumer != undefined) {
        await consumer.stop();
        await consumer.disconnect();
    }
}

module.exports = {
    initKafkaConsumer,
    closeConsumer,
    isReady ,
    configure: function (configObj) {
        config = configObj;
    }
}