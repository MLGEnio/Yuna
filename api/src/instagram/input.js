import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType,
} from "graphql";

const InstaInput = new GraphQLObjectType({
  name: "InstagramInput",
  fields: {
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
    img: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

export default InstaInput;
