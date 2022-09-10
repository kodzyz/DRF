import graphene
from graphene_django import DjangoObjectType
from todo.models import ToDo, Project
from client.models import ClientUser


class ToDoObjectType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectObjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ClientUserObjectType(DjangoObjectType):
    class Meta:
        model = ClientUser
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(ToDoObjectType)

    def resolve_all_todo(self, info):
        return ToDo.objects.all()

    all_project = graphene.List(ProjectObjectType)

    def resolve_all_project(self, info):
        return Project.objects.all()

    all_user = graphene.List(ClientUserObjectType)

    def resolve_all_user(self, info):
        return ClientUser.objects.all()


# запрос к связанным полям
# {
#     allTodo {
#         id
#         content
#         project {
#             id
#             name
#             user {
#                 id
#                 email
#             }
#         }
#         author {
#             id
#             firstName
#             email
#         }
#     }
# }
# одни и те же данные два раза
# {
#   allProject{name}
#   ProjectAgain:allProject{name}
# }
# рекурсивные запросы
# {
#     allUser {
#         id
#         projectSet{
#             name
#             user {
#                 id
#                 projectSet{
#                     name
#                 }
#             }
#         }
#         todoSet{
#             content
#         }
#     }
# }


schema = graphene.Schema(query=Query)
