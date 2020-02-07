import kafka from 'kafka-node'
import CassendraConnector from './../cassendra-connector'

export default class Consumer {

  static connect() {
    this.kafka = kafka;

    // let KafkaConsumer = kafka.Consumer;
    this.client = this.client || new kafka.KafkaClient({
      kafkaHost: "127.0.0.1:9092"
    });

    this.consumer = new kafka.Consumer(this.client, [{ topic: "message", partition: 0 }], {
      groupId: '',//consumer group id, default `kafka-node-group`
      // Auto commit config
      autoCommit: true,
      autoCommitIntervalMs: 5000,
      // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
      fetchMaxWaitMs: 10000,
      // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
      fetchMinBytes: 1,
      // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
      fetchMaxBytes: 1024 * 1024,
      // If set true, consumer will fetch message from the given offset in the payloads
      fromOffset: false,
      // If set to 'buffer', values will be returned as raw buffer objects.
      encoding: 'utf8',
      keyEncoding: 'utf8'
    });

    this.consumer.on("message", function(message) {
      CassendraConnector.connect(message.value)
    }).on('error', function (err) {
      console.log(err)
    })
  }
}
