<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\SecurityBundle\Security;

final class SignPresenceController extends AbstractController {

    public function __invoke(EntityManagerInterface $em, Security $security): JsonResponse
    {
        /** @var \App\Entity\User|null $user */
        $user = $security->getUser();

        if (!$user) {
            return new JsonResponse(['message' => 'Unauthorized'], 401);
        }

        $user->setIsPresent(true);
        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'Présence validée']);
    }
}