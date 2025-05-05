<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    const USERS = [
        ['bob@test.com', 'bob123', 'Test', 'Bob'],
        ['jean@jean.com', 'jean123', 'Jean', 'Jean'],
        ['marie@poppins.com', 'marie123', 'Poppins', 'Marie'],
        ['connor@bedard.com', 'connor123', 'Bedard', 'Connor']
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::USERS as $userData) {
            $user = new User();
            $user->setEmail($userData[0])
                ->setPassword($userData[1])
                ->setName($userData[2])
                ->setFirstname($userData[3]);

            $manager->persist($user);
        };

        $manager->flush();
    }
}

