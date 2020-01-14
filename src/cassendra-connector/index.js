import cassendra from "cassandra-driver";

export default class CassendraConnector {
  constructor() {
    this.client = new cassendra.Client({
      contactPoints: ["localhost:9042"],
      localDataCenter: "datacenter1"
    });

    this.client.connect(function(err) {
      // assert.ifError(err);
      console.log(err);
    });
  }

  insertData(message) {
    let data = JSON.parse(message)
    const query =
      "INSERT INTO message.posts (id, title, body, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
    const params = [
      data.id,
      data.title,
      data.body,
      data.created_at,
      data.updated_at
    ];
    this.client.execute(query, params, { prepare: true }, function(err) {
      // assert.ifError(err);
      //Inserted in the cluster
      console.log(err);
    });
  }
}
