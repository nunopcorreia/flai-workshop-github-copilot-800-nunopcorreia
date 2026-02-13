from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name="Test User",
            email="test@example.com",
            total_points=100
        )
    
    def test_user_creation(self):
        self.assertEqual(self.user.name, "Test User")
        self.assertEqual(self.user.email, "test@example.com")
        self.assertEqual(self.user.total_points, 100)


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name="Test Team",
            description="A test team",
            member_count=5,
            total_points=500
        )
    
    def test_team_creation(self):
        self.assertEqual(self.team.name, "Test Team")
        self.assertEqual(self.team.member_count, 5)
        self.assertEqual(self.team.total_points, 500)


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user_id="user123",
            activity_type="Running",
            duration=30,
            calories_burned=300,
            points_earned=10
        )
    
    def test_activity_creation(self):
        self.assertEqual(self.activity.activity_type, "Running")
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.points_earned, 10)


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.entry = Leaderboard.objects.create(
            user_id="user123",
            user_name="Test User",
            team_name="Test Team",
            total_points=150,
            rank=1
        )
    
    def test_leaderboard_creation(self):
        self.assertEqual(self.entry.user_name, "Test User")
        self.assertEqual(self.entry.rank, 1)


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name="Morning Cardio",
            description="A great cardio workout",
            difficulty="Medium",
            duration=45,
            target_muscle_groups=["legs", "core"],
            recommended_for="Beginners"
        )
    
    def test_workout_creation(self):
        self.assertEqual(self.workout.name, "Morning Cardio")
        self.assertEqual(self.workout.difficulty, "Medium")
        self.assertEqual(self.workout.duration, 45)


class UserAPITest(APITestCase):
    def test_create_user(self):
        url = '/api/users/'
        data = {
            'name': 'API Test User',
            'email': 'apitest@example.com',
            'total_points': 0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITest(APITestCase):
    def test_create_team(self):
        url = '/api/teams/'
        data = {
            'name': 'API Test Team',
            'description': 'Test team via API',
            'member_count': 0,
            'total_points': 0
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
