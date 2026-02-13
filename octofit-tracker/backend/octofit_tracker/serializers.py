from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    username = serializers.CharField(source='name')
    date_joined = serializers.DateTimeField(source='created_at')
    team_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'team_id', 'team_name', 'total_points', 'created_at', 'date_joined']
    
    def get_id(self, obj):
        return str(obj._id)
    
    def get_team_name(self, obj):
        if obj.team_id:
            try:
                from bson import ObjectId
                team = Team.objects.get(_id=ObjectId(obj.team_id))
                return team.name
            except (Team.DoesNotExist, Exception):
                return None
        return None


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'member_count', 'total_points', 'created_at']
    
    def get_id(self, obj):
        return str(obj._id)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Activity
        fields = ['id', 'user_id', 'activity_type', 'duration', 'calories_burned', 'points_earned', 'date']
    
    def get_id(self, obj):
        return str(obj._id)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Leaderboard
        fields = ['id', 'user_id', 'user_name', 'team_name', 'total_points', 'rank']
    
    def get_id(self, obj):
        return str(obj._id)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()
    
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty', 'duration', 'target_muscle_groups', 'recommended_for']
    
    def get_id(self, obj):
        return str(obj._id)
