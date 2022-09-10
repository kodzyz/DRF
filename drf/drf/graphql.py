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

    get_project_by_id = graphene.Field(ProjectObjectType, pk=graphene.Int(required=True))

    def resolve_get_project_by_id(self, info, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    get_project_by_email = graphene.List(ProjectObjectType,
                                         email=graphene.String(required=False))

    def resolve_get_project_by_email(self, info, email=None):
        project = Project.objects.all()
        if email:
            project = Project.objects.filter(user__email__contains=email)
        return project

# {
#   getProjectByEmail{
#     id
#     name
#   }
# }

# {
#   getProjectByEmail(email: "nasta1") {
#     id
#     name
#   }
# }

schema = graphene.Schema(query=Query)
