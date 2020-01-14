# node-setup
CREATE KEYSPACE message WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND durable_writes = true;

bitnami/zookeeper:latest - zookeeper

bitnami/kafka:latest - kafka

cassandra:latest - cassandra

delermando/docker-cassandra-web:v0.4.0 - cassandra dashboard

Conduktor - kafka dashboard