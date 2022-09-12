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


class ProjectUpdateMutation(graphene.Mutation):
    class Arguments:
        pk = graphene.Int(required=True)
        name = graphene.String(required=False)
        repo = graphene.String(required=False)
        user = graphene.Int(required=False)

    project = graphene.Field(ProjectObjectType)

    @classmethod
    def mutate(cls, root, info, pk, name=None, repo=None, user=None):
        project = Project.objects.get(pk=pk)
        if name:
            project.name = name
        if repo:
            project.repo = repo
        if user:
            project.user = user

        if name or repo or user:
            project.save()
        return cls(project)


class Mutations(graphene.ObjectType):
    update_project = ProjectUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)

# mutation {
#   updateProject(pk: 5, name: "Шаблоны") {
#     project {
#       id
#       name
#       repo
#       user {
#         id
#       }
#     }
#   }
# }
