from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='The mightiest heroes of the Marvel Universe',
            member_count=0,
            total_points=0
        )
        
        team_dc = Team.objects.create(
            name='Team DC',
            description='The legendary heroes of the DC Universe',
            member_count=0,
            total_points=0
        )

        # Marvel superheroes
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com'},
            {'name': 'Doctor Strange', 'email': 'stephen.strange@marvel.com'},
            {'name': 'Black Panther', 'email': 'tchalla@marvel.com'},
        ]

        # DC superheroes
        dc_heroes = [
            {'name': 'Superman', 'email': 'clark.kent@dc.com'},
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com'},
            {'name': 'The Flash', 'email': 'barry.allen@dc.com'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com'},
            {'name': 'Cyborg', 'email': 'victor.stone@dc.com'},
            {'name': 'Supergirl', 'email': 'kara.danvers@dc.com'},
        ]

        # Create Marvel users
        self.stdout.write('Creating Marvel heroes...')
        marvel_users = []
        for hero in marvel_heroes:
            points = random.randint(500, 2000)
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_marvel._id),
                total_points=points
            )
            marvel_users.append(user)

        # Create DC users
        self.stdout.write('Creating DC heroes...')
        dc_users = []
        for hero in dc_heroes:
            points = random.randint(500, 2000)
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team_id=str(team_dc._id),
                total_points=points
            )
            dc_users.append(user)

        all_users = marvel_users + dc_users

        # Update team member counts and total points
        team_marvel.member_count = len(marvel_users)
        team_marvel.total_points = sum(u.total_points for u in marvel_users)
        team_marvel.save()

        team_dc.member_count = len(dc_users)
        team_dc.total_points = sum(u.total_points for u in dc_users)
        team_dc.save()

        # Create activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing', 'CrossFit']
        
        for user in all_users:
            # Create 5-10 activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                duration = random.randint(15, 120)
                calories = duration * random.randint(5, 12)
                points = calories // 10
                
                Activity.objects.create(
                    user_id=str(user._id),
                    activity_type=random.choice(activity_types),
                    duration=duration,
                    calories_burned=calories,
                    points_earned=points
                )

        # Create leaderboard entries
        self.stdout.write('Creating leaderboard...')
        sorted_users = sorted(all_users, key=lambda u: u.total_points, reverse=True)
        
        for rank, user in enumerate(sorted_users, start=1):
            team_name = 'Team Marvel' if user in marvel_users else 'Team DC'
            Leaderboard.objects.create(
                user_id=str(user._id),
                user_name=user.name,
                team_name=team_name,
                total_points=user.total_points,
                rank=rank
            )

        # Create workouts
        self.stdout.write('Creating workouts...')
        workouts_data = [
            {
                'name': 'Super Soldier Training',
                'description': 'High-intensity full-body workout inspired by Captain America',
                'difficulty': 'Advanced',
                'duration': 60,
                'target_muscle_groups': ['chest', 'arms', 'legs', 'core'],
                'recommended_for': 'Team Marvel'
            },
            {
                'name': 'Asgardian Strength Routine',
                'description': 'Heavy lifting and endurance training worthy of Thor',
                'difficulty': 'Advanced',
                'duration': 75,
                'target_muscle_groups': ['back', 'shoulders', 'legs'],
                'recommended_for': 'Team Marvel'
            },
            {
                'name': 'Web-Slinger Circuit',
                'description': 'Agility and flexibility workout for spider-like reflexes',
                'difficulty': 'Intermediate',
                'duration': 45,
                'target_muscle_groups': ['core', 'arms', 'legs'],
                'recommended_for': 'Team Marvel'
            },
            {
                'name': 'Dark Knight Combat Training',
                'description': 'Martial arts and tactical fitness routine from Gotham',
                'difficulty': 'Advanced',
                'duration': 90,
                'target_muscle_groups': ['full body', 'core', 'cardio'],
                'recommended_for': 'Team DC'
            },
            {
                'name': 'Kryptonian Power Workout',
                'description': 'Strength and endurance training for superhuman abilities',
                'difficulty': 'Expert',
                'duration': 60,
                'target_muscle_groups': ['chest', 'shoulders', 'legs', 'back'],
                'recommended_for': 'Team DC'
            },
            {
                'name': 'Speed Force Cardio',
                'description': 'High-speed interval training for maximum velocity',
                'difficulty': 'Intermediate',
                'duration': 30,
                'target_muscle_groups': ['legs', 'cardio', 'core'],
                'recommended_for': 'Team DC'
            },
            {
                'name': 'Amazon Warrior Training',
                'description': 'Balanced strength and combat conditioning',
                'difficulty': 'Advanced',
                'duration': 70,
                'target_muscle_groups': ['full body', 'core', 'arms'],
                'recommended_for': 'Team DC'
            },
            {
                'name': 'Mystic Arts Flow',
                'description': 'Yoga and meditation with a touch of sorcery',
                'difficulty': 'Beginner',
                'duration': 40,
                'target_muscle_groups': ['flexibility', 'core', 'balance'],
                'recommended_for': 'Team Marvel'
            },
        ]

        for workout_data in workouts_data:
            Workout.objects.create(**workout_data)

        # Create unique index on email field (via MongoDB shell)
        self.stdout.write('Creating unique index on user email...')
        # This will be done via mongosh separately

        self.stdout.write(self.style.SUCCESS(f'Database population complete!'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(all_users)} users'))
        self.stdout.write(self.style.SUCCESS(f'Created 2 teams'))
        self.stdout.write(self.style.SUCCESS(f'Created {Activity.objects.count()} activities'))
        self.stdout.write(self.style.SUCCESS(f'Created {Leaderboard.objects.count()} leaderboard entries'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts_data)} workouts'))
