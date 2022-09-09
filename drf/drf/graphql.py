import graphene


class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")

    def resolve_hello(self, info):
        return 'world!'

# {
#   hello
# }

# {
#   "data": {
#     "hello": "world!"
#   }
# }


schema = graphene.Schema(query=Query)
