<?php

namespace App\DataFixtures;

use App\Entity\Lesson;
use App\Entity\User;
use App\Entity\UserLesson;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    const USERS = [
        ['alice@example.com', 'alice123', 'Liddell', 'Alice'],
        ['bob@test.com', 'bob123', 'Test', 'Bob'],
        ['jean@jean.com', 'jean123', 'Jean', 'Jean'],
        ['marie@poppins.com', 'marie123', 'Poppins', 'Marie'],
        ['connor@bedard.com', 'connor123', 'Bedard', 'Connor'],
        ['luc@skywalker.com', 'luc123', 'Skywalker', 'Luc'],
        ['lena@zola.com', 'lena123', 'Zola', 'Lena'],
        ['emma@stone.com', 'emma123', 'Stone', 'Emma'],
        ['mark@twain.com', 'mark123', 'Twain', 'Mark'],
        ['elon@tusk.com', 'elon123', 'Tusk', 'Elon'],
    ];

    public function load(ObjectManager $manager): void
    {
        $users = [];
        foreach (self::USERS as $userData) {
            $user = new User();
            $user->setEmail($userData[0])
                ->setPassword($userData[1])
                ->setName($userData[2])
                ->setFirstname($userData[3]);

            $manager->persist($user);
            $users[] = $user;
        };

        $lesson = new Lesson();
        $lesson->setName('Cours de Maths');
        
        $manager->persist($lesson);

        foreach ($users as $user) {
            $userLesson = new UserLesson();
            $userLesson->setUser($user);
            $userLesson->setLesson($lesson);
            
            $manager->persist($userLesson);
        }

        $manager->flush();
    }
}

