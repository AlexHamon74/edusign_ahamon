<?php

namespace App\DataFixtures;

use App\Entity\Eleve;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    const ELEVES = [
        ['Bob', 'Test'],
        ['Jean', 'Jean'],
        ['Marie', 'Poppins'],
        ['Connor', 'Bedard']
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::ELEVES as $eleveData) {
            $eleve = new Eleve();
            $eleve->setPrenom($eleveData[0])
                ->setNom($eleveData[1]);

            $manager->persist($eleve);
        };

        $manager->flush();
    }
}

