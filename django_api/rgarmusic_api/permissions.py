from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    message = 'Not owner or admin.'
    def has_object_permission(self, request, view, obj) :

        return obj == request.user or request.user.is_staff