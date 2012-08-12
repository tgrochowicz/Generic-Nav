#!/usr/bin/python

import optparse
from pymongo import Connection
import json

def parse_options():
    p = optparse.OptionParser()
    p.add_option('-m', '--mongohost', dest='host', help='Mongo Host location')
    p.add_option('-p', '--port', dest='port', help='Mongo Port')
    p.add_option('-d', '--database', dest='database', help='Mongo Database')
    p.add_option('-f', '--file', dest='file', help='Graph File')
    opts, args = p.parse_args()

    return {
        'host': opts.host,
        'database': opts.database,
        'port': opts.port,
        'file': opts.file
    }


if __name__ == '__main__':
    config = parse_options()

    connection = Connection(config['host'] or 'localhost', config['port'] or 27017)
    db = connection[config['database'] or 'nav']

    nodes_data = open(config['file'] or 'graph.json')
    nodes = json.load(nodes_data)
    nodes_data.close()

    collection = db['nodes']
    collection.remove({})
    for endpoint in nodes['endpoints']:
        collection.insert(nodes['endpoints'][endpoint])

    collection = db['junctions']
    collection.remove({})
    for junction in nodes['junctions']:
        collection.insert(nodes['junctions'][junction])

    collection = db['floors']
    collection.remove({})
    for floor in nodes['floors']:
        collection.insert(nodes['floors'][floor])

    collection = db['elevators']
    collection.remove({})
    for elevator in nodes['elevators']:
        collection.insert(nodes['elevators'][elevator])


