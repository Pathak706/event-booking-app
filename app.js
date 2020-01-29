const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

/**
 * set up endpoints used by frontend app
 * and set up @graphqlHttp middleware function.
 *   */ 
app.use('/graphql', graphqlHttp({
    // configure graphql here
    // here the @schema name will come where graphql point
    /**
     * @buildSchema have @schema with 
     * @query to define incoming graphql req to fetch data
     * @mutation to define to changing data create, update, delete
     */
    schema: buildSchema(`
        type RootQuery {
            events: [String!]!
        }

        type RootMutation {
            createEvent(name: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // all resolver will come here
    rootValue: {
        events: () => {
            return ['Rahul', 'Pathak', 'GraphQL']
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}));

app.listen(3000);